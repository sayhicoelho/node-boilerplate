const helpers = require('../utils/helpers')
const i18n = require('../i18n')

const required = ({ attribute, value, data, lang }) => {
  if (value) return true

  return i18n.validations[lang].required
}

const nullable = ({ attribute, value, data, lang }) => {
  if (!value) {
    data[attribute] = null

    return false
  }

  return true
}

const string = ({ attribute, value, data, lang }) => {
  if (typeof value === 'string') return true

  return i18n.validations[lang].string
}

const integer = ({ attribute, value, data, lang }) => {
  if (helpers.isInteger(value)) return true

  return i18n.validations[lang].integer
}

const email = ({ attribute, value, data, lang }) => {
  if (helpers.isEmail(value)) return true

  return i18n.validations[lang].email
}

const host = ({ attribute, value, data, lang }) => {
  if (helpers.isHost(value)) return true

  return i18n.validations[lang].host
}

const url = ({ attribute, value, data, lang }) => {
  if (helpers.isURL(value)) return true

  return i18n.validations[lang].url
}

const min = ({ attribute, value, data, lang }, min) => {
  if (value.length >= min) return true

  return helpers.replacer(i18n.validations[lang].min, {
    min,
  })
}

const max = ({ attribute, value, data, lang }, max) => {
  if (value.length <= max) return true

  return helpers.replacer(i18n.validations[lang].max, {
    max,
  })
}

const match = ({ attribute, value, data, lang }, field) => {
  if (value == data[field]) return true

  return helpers.replacer(i18n.validations[lang].match, {
    field: i18n.translateField(field, lang),
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
