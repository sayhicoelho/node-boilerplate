const { replacer } = require('../utils/helpers')
const { validations: messages, fields, translateField } = require('../i18n')

const required = (attribute, value, data, lang) => {
  if (value) return true

  return messages[lang].required
}

const string = (attribute, value, data, lang) => {
  if (typeof value === 'string') return true

  return messages[lang].string
}

const email = (attribute, value, data, lang) => {
  if (value.indexOf('@') !== -1) return true

  return messages[lang].email
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
  string,
  email,
  min,
  max,
  match,
}
