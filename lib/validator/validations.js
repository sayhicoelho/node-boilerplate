import * as helpers from '@utils/helpers'
import * as i18n from '@i18n'

export function required({ attribute, value, data, lang }) {
  if (value) return true

  return i18n.validations[lang].required
}

export function nullable({ attribute, value, data, lang }) {
  if (!value) {
    data[attribute] = null

    return false
  }

  return true
}

export function string({ attribute, value, data, lang }) {
  if (typeof value === 'string') return true

  return i18n.validations[lang].string
}

export function integer({ attribute, value, data, lang }) {
  if (helpers.isInteger(value)) return true

  return i18n.validations[lang].integer
}

export function email({ attribute, value, data, lang }) {
  if (helpers.isEmail(value)) return true

  return i18n.validations[lang].email
}

export function host({ attribute, value, data, lang }) {
  if (helpers.isHost(value)) return true

  return i18n.validations[lang].host
}

export function url({ attribute, value, data, lang }) {
  if (helpers.isURL(value)) return true

  return i18n.validations[lang].url
}

export function min({ attribute, value, data, lang }, min) {
  if (value.length >= min) return true

  return helpers.replacer(i18n.validations[lang].min, {
    min,
  })
}

export function max({ attribute, value, data, lang }, max) {
  if (value.length <= max) return true

  return helpers.replacer(i18n.validations[lang].max, {
    max,
  })
}

export function match({ attribute, value, data, lang }, field) {
  if (value == data[field]) return true

  return helpers.replacer(i18n.validations[lang].match, {
    field: i18n.translateField(field, lang),
  })
}
