const config = require('../config')
const { __ } = require('../i18n')

const roundedMaxFileSize = Math.round(config.storage.maxFileSize / 1024 / 1024)

const customErrors = {
  LIMIT_FILE_SIZE: {
    message: `The file size must be lower than ${roundedMaxFileSize} MB`,
    status: 422,
  },
}

const badRequestErrors = ['Error', 'MulterError']

function handle(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
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
    // TODO: Save error to daily logs
    console.error(err)
  }

  res.status(status).json({ message })
}

module.exports = handle
