const { io } = require('../services/socketService')

function run() {
  io.emit('cron task message', 'task message sent')

  console.log('Task executed')
}

module.exports = {
  run,
}
