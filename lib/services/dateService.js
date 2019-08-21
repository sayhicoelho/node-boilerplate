const moment = require('moment-timezone')
const config = require('@config')
const { dateFormats } = require('@i18n')

function format(
  date,
  format,
  lang = config.app.fallbackLang,
  timezone = 'UTC'
) {
  return moment(date)
    .tz(timezone)
    .format(dateFormats[lang][format] || format)
}

module.exports = {
  format,
}
