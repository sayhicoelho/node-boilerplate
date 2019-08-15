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

// tenho que parar de pensar no front-end! o back-end não depende do front-end, cacete!
// ao invés de /v1/blog, vou criar apenas um endpoint para /v1/posts e inserir queries
// opcionais para dizer quais campos eu quero na minha consulta, por ex: /v1/posts?per_page=20&page=1
