const path = require('path')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const config = require('./config')
const { app, http } = require('./bootstrap')
const { io } = require('./services/socketService')
const sockets = require('./sockets')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

if (config.app.env != 'production') {
  const logger = require('morgan')

  app.use(logger('dev'))
}

app.use(router)

app.disable('x-powered-by')

io.on('connection', socket => {
  console.log(`${socket.id} connected.`)

  sockets.handle(socket)
})

http.listen(config.app.port)
