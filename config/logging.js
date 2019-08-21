module.exports = {
  dirname: 'logs',
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: process.env.LOG_MAX_SIZE,
  maxFiles: process.env.LOG_MAX_FILES,
}
