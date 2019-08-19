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

const translateField = (field, lang) => {
  return fields[lang][field] || field
}

const __ = (message, lang) => {
  return messages[lang][message] || message
}

module.exports = {
  validations,
  fields,
  translateField,
  __,
}
