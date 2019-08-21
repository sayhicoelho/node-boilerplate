const Queue = require('bull')

function dispatch(to, data) {
  const queue = new Queue(to)

  queue.add(data)
}

module.exports = {
  dispatch,
}
