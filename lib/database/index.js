const mysql = require('mysql')
const config = require('@config')
const db = mysql.createConnection(config.database)

db.connect()

module.exports = {
  db,
}
