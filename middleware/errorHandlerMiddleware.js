const config = require('../config')
const loggerService = require('../services/loggerService')
const { __ } = require('../i18n')

const roundedMaxFileSize = Math.round(config.storage.maxFileSize / 1024 / 1024)

const badRequestErrors = ['Error', 'MulterError']

function handle(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const customErrors = {
    LIMIT_FILE_SIZE: {
      message: __('The file size must be lower than', res.locals.lang, {
        mb: roundedMaxFileSize,
      }),
      status: 422,
    },
  }

  const customError = customErrors[err.code]
  let status, message

  if (customError) {
    status = customError.status
    message = customError.message
  } else if (badRequestErrors.includes(err.name)) {
    status = 400
    message = __(err.message, res.locals.lang)
  } else {
    status = 500
    message = __('An unexpected error has ocurred', res.locals.lang)
    loggerService.error(err.stack)
  }

  res.status(status).json({ message })
}

module.exports = handle
