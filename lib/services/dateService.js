import moment from 'moment-timezone'
import config from '@config'
import { dateFormats } from '@i18n'

export const formats = {
  iso: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
}

export function format(
  date,
  format,
  lang = config.app.fallbackLang,
  timezone = 'UTC'
) {
  return moment(date)
    .tz(timezone)
    .format(dateFormats[lang][format] || format)
}
