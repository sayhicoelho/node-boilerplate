const moment = require('moment-timezone')

const getDate = (date, format, timezone = 'UTC') => {
  return moment(date)
    .tz(timezone)
    .format(format)
}

module.exports = {
  getDate,
}
