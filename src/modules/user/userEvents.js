const { EventEmitter } = require('events')
const event = new EventEmitter()

event.on('user.registered', user => {
  // TODO: Do some action after user registered.
  console.log('User registered:', user)
})

module.exports = event
