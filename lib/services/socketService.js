const { http } = require('../bootstrap')
const io = require('socket.io')(http)
const redis = require('socket.io-redis')

io.adapter(redis())

module.exports = {
  io,
}
