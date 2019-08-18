const { db } = require('..')

const sql = 'INSERT INTO users (name) VALUES (?)'

db.query(sql, ['Renan Coelho'], (err, rows) => {
  console.log(rows)

  db.close()
})
