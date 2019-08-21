require('dotenv').config()

module.exports = {
  app: require('./app'),
  auth: require('./auth'),
  database: require('./database'),
  mail: require('./mail'),
  storage: require('./storage'),
  logging: require('./logging'),
}
