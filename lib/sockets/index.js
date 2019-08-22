export function handle(socket) {
  socket.on('join', room => {
    socket.join(room)
    console.log(`${socket.id} joined to ${room}`)
  })

  socket.on('leave', room => {
    socket.leave(room)
    console.log(`${socket.id} leave from ${room}`)
  })

  socket.on('leaveAll', () => {
    socket.leaveAll()
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', socket.id)
    console.log(`${socket.id} disconnected.`)
  })
}
