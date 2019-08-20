const moment = require('moment')
const config = require('../config')

function handle(req, res, next) {
  const lang = req.header('Content-Language')
  const timezone = req.header('X-Timezone')
  const token = req.header('authorization')

  res.locals.userAgent = req.get('User-Agent')
  res.locals.ip = req.headers['X-REAL-IP'] || req.connection.remoteAddress
  res.locals.lang = config.app.langs.includes(lang)
    ? lang
    : config.app.fallbackLang

  res.locals.timezone = moment.tz.zone(timezone) !== null ? timezone : 'UTC'
  res.locals.timezoneOffset = moment.tz(res.locals.timezone).utcOffset()

  if (token) res.locals.jwt = token.split(' ')[1]

  next()
}

module.exports = handle
