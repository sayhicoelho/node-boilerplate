import * as validations from './validations'
import config from '@config'
import { translateField } from '@i18n'

const separator = '|'

export async function validate(data, rules, lang = config.app.fallbackLang) {
  const errors = {}

  for (let key in rules) {
    const rule = rules[key]
    const value = data[key]
    const splittedRules = rule.split(separator)

    for (let validation of splittedRules) {
      const args = [{ key, value, data, lang }]
      const argsIndex = validation.indexOf(':')

      if (argsIndex !== -1) {
        args.push(...validation.substr(argsIndex + 1).split(','))
        validation = validation.split(':')[0]
      }

      const validationResult = validations[validation].apply(null, args)

      if (typeof validationResult === 'string') {
        const message = validationResult.replace(
          ':attribute',
          translateField(key, lang)
        )

        errors[key] = message

        break
      } else if (validationResult === false) {
        break
      }
    }
  }

  if (Object.keys(errors).length > 0) throw errors
}
