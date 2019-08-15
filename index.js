require('dotenv').config()

const path = require('path')
const express = require('express')
const cors = require('cors')
const router = require('./src/routes')
const config = require('./src/config')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use(router)

app.disable('x-powered-by')

app.listen(config.app.port)
