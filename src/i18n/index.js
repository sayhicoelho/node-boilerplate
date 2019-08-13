const validations = {
  en: require('./en/validations'),
  pt: require('./pt/validations'),
}

const fields = {
  en: require('./en/fields'),
  pt: require('./pt/fields'),
}

const translateField = (field, lang) => fields[lang][field] || field

module.exports = {
  validations,
  fields,
  translateField,
}
