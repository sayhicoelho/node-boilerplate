const utils = require('./utils')

function createTable(table, { primaryKey, timestamps, columns }) {
  const rawColumns = []
  const foreigns = []

  if (timestamps === true) utils.setTimestamps(columns)

  for (let column in columns) {
    const options = columns[column]

    if ('foreign' in options)
      foreigns.push(utils.getForeign(table, column, options))

    rawColumns.push(utils.getRawOptions(column, options))
  }

  const sql = `CREATE TABLE ${table} (${rawColumns.join(',')},
    PRIMARY KEY (${primaryKey})
    ${foreigns.length > 0 ? ', ' + foreigns.join(',') : ''})`

  return utils.query(sql)
}

function dropTable(table) {
  const sql = `DROP TABLE ${table}`

  return utils.query(sql)
}

function addColumns(table, columns) {
  const rawColumns = []

  for (let column in columns) {
    const options = columns[column]

    rawColumns.push(utils.getRawOptions(column, options))
  }

  const sql = `ALTER TABLE ${table} ${rawColumns
    .map(c => `ADD COLUMN ${c}`)
    .join(',')}`

  return utils.query(sql)
}

function checkIfExists(table, where, values) {
  const sql = `SELECT COUNT(*) as rowsCount FROM ${table} ${where}`

  return utils.query(sql, values)
}

function addRow(table, columns) {
  let columnNames = []
  let columnValues = []

  for (let column in columns) {
    const value = columns[column]

    columnNames.push(column)
    columnValues.push(value)
  }

  const strColumnNames = columnNames.join(',')
  const strColumnValues = columnValues.map(c => '?').join(',')

  let sql = `INSERT INTO ${table} (${strColumnNames}) VALUES (${strColumnValues})`

  return utils.query(sql, columnValues)
}

function dropRow(table, where, values) {
  const sql = `DELETE FROM ${table} ${where}`

  return utils.query(sql, values)
}

function dropColumns(table, columns) {
  const sql = `ALTER TABLE ${table} ${columns
    .map(c => `DROP COLUMN ${c}`)
    .join(',')}`

  return utils.query(sql)
}

module.exports = {
  createTable,
  dropTable,
  addColumns,
  checkIfExists,
  addRow,
  dropRow,
  dropColumns,
}
