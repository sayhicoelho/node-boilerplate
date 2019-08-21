const winston = require('winston')
const config = require('@config')
const dateService = require('@services/dateService')

require('winston-daily-rotate-file')

const transport = new winston.transports.DailyRotateFile(config.logging)

const logger = winston.createLogger({
  transports: [transport],
})

function handleLog(message, level) {
  const logData = {
    time: dateService.format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    message,
  }

  return logger[level](logData)
}

function info(message) {
  return handleLog(message, 'info')
}

function error(message) {
  return handleLog(message, 'error')
}

function warn(message) {
  return handleLog(message, 'warn')
}

module.exports = {
  info,
  error,
  warn,
}
