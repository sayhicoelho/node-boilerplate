import Queue from 'bull'

export function dispatch(to, data) {
  const queue = new Queue(to)

  queue.add(data)
}
