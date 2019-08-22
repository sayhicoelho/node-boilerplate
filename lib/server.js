import path from 'path'
import express from 'express'
import cors from 'cors'
import moment from 'moment-timezone'
import router from './routes'
import config from './config'
import commonHeaders from './middleware/commonHeadersMiddleware'
import errorHandler from './middleware/errorHandlerMiddleware'
import { app, http } from './bootstrap'
import { io } from './services/socketService'
import * as sockets from './sockets'

moment.tz.setDefault('UTC')

if (config.app.env != 'production') {
  const logger = require('morgan')

  app.use(logger('dev'))
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(commonHeaders)
app.use(router)
app.use(errorHandler)

app.disable('x-powered-by')

io.on('connection', socket => {
  console.log(`${socket.id} connected.`)

  sockets.handle(socket)
})

http.listen(config.app.port, () => {
  console.log(`Server started on port ${config.app.port}`)
})
