const moment = require('moment-timezone')
const config = require('../config')
const { dateFormats } = require('../i18n')

const format = (
  date,
  format,
  lang = config.app.fallbackLang,
  timezone = 'UTC'
) => {
  return moment(date)
    .tz(timezone)
    .format(dateFormats[lang][format])
}

module.exports = {
  format,
}
