const {
  replacer,
  isInteger,
  isEmail,
  isHost,
  isURL,
} = require('../utils/helpers')

const { validations: messages, translateField } = require('../i18n')

const required = (attribute, value, data, lang) => {
  if (value) return true

  return messages[lang].required
}

const nullable = (attribute, value, data, lang) => {
  if (!value) {
    data[attribute] = null

    return false
  }

  return true
}

const string = (attribute, value, data, lang) => {
  if (typeof value === 'string') return true

  return messages[lang].string
}

const integer = (attribute, value, data, lang) => {
  if (isInteger(value)) return true

  return messages[lang].integer
}

const email = (attribute, value, data, lang) => {
  if (isEmail(value)) return true

  return messages[lang].email
}

const host = (attribute, value, data, lang) => {
  if (isHost(value)) return true

  return messages[lang].host
}

const url = (attribute, value, data, lang) => {
  if (isURL(value)) return true

  return messages[lang].url
}

const min = (attribute, value, data, lang, min) => {
  if (value.length >= min) return true

  return replacer(messages[lang].min, {
    min,
  })
}

const max = (attribute, value, data, lang, max) => {
  if (value.length <= max) return true

  return replacer(messages[lang].max, {
    max,
  })
}

const match = (attribute, value, data, lang, field) => {
  if (value == data[field]) return true

  return replacer(messages[lang].match, {
    field: translateField(field, lang),
  })
}

module.exports = {
  required,
  nullable,
  string,
  integer,
  email,
  host,
  url,
  min,
  max,
  match,
}
