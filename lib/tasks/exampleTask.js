import { io } from '@services/socketService'

export function run() {
  io.emit('cron task message', 'task message sent')

  console.log('Task executed')
}
