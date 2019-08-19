const path = require('path')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const config = require('./config')
const app = express()

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

app.listen(config.app.port)
