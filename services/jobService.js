const Queue = require('bull')

const dispatch = (to, data) => {
  const queue = new Queue(to)

  queue.add(data)
}

module.exports = {
  dispatch,
}
