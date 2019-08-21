const winston = require('winston')
const config = require('../config')
const dateService = require('../services/dateService')

require('winston-daily-rotate-file')

const transport = new winston.transports.DailyRotateFile(config.logging)

const logger = winston.createLogger({
  transports: [transport],
})

const handleLog = (message, level) => {
  const logData = {
    time: dateService.format(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
    message,
  }

  return logger[level](logData)
}

const info = message => handleLog(message, 'info')
const error = message => handleLog(message, 'error')
const warn = message => handleLog(message, 'warn')

module.exports = {
  info,
  error,
  warn,
}
