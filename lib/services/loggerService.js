import winston from 'winston'
import config from '@config'
import * as dateService from '@services/dateService'

require('winston-daily-rotate-file')

const transport = new winston.transports.DailyRotateFile(config.logging)

const logger = winston.createLogger({
  transports: [transport],
})

function handleLog(message, level) {
  const logData = {
    time: dateService.format(Date.now(), dateService.formats.iso),
    message,
  }

  return logger[level](logData)
}

export function info(message) {
  return handleLog(message, 'info')
}

export function error(message) {
  return handleLog(message, 'error')
}

export function warn(message) {
  return handleLog(message, 'warn')
}
