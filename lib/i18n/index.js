const config = require('../config')
const helpers = require('../utils/helpers')

const messages = {
  en: require('./en/messages'),
  pt: require('./pt/messages'),
}

const validations = {
  en: require('./en/validations'),
  pt: require('./pt/validations'),
}

const fields = {
  en: require('./en/fields'),
  pt: require('./pt/fields'),
}

const dateFormats = {
  en: require('./en/dates'),
  pt: require('./pt/dates'),
}

function translateField(field, lang) {
  return fields[lang][field] || field
}

function __(key, lang, attributes = null) {
  let message = messages[lang][key]

  if (!message) {
    message = messages[config.app.fallbackLang][key]

    if (!message) {
      return key
    }
  }

  if (typeof message === 'string') {
    return helpers.replacer(message, attributes)
  } else {
    const parts = []

    for (let part of message) {
      if (typeof part === 'string') {
        parts.push(part)
      } else {
        const value = attributes[part.key]

        for (let key in part) {
          if (key != 'key') {
            const range = key.split(',')
            const min = range[0]
            const max = range[1]

            if (!max && value == min) {
              parts.push(part[key])
              break
            } else if (max == '*' && value >= min) {
              parts.push(part[key])
              break
            } else if (value <= max) {
              parts.push(part[key])
              break
            }
          }
        }
      }
    }

    return helpers.replacer(parts.join(' '), attributes)
  }
}

module.exports = {
  validations,
  fields,
  dateFormats,
  translateField,
  __,
}
