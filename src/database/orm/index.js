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

  const sql = `CREATE TABLE IF NOT EXISTS ${table} (${rawColumns.join(',')},
    PRIMARY KEY (${primaryKey})
    ${foreigns.length > 0 ? ', ' + foreigns.join(',') : ''})`

  return utils.query(sql)
}

function dropTable(table) {
  const sql = `DROP TABLE IF EXISTS ${table}`

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
  const strColumnValues = columnValues.map(() => '?').join(',')
  const sql = `INSERT INTO ${table} (${strColumnNames}) VALUES (${strColumnValues})`

  return utils.query(sql, columnValues)
}

function addRows(table, rows) {
  const fields = Object.keys(rows[0])
  const strColumnNames = fields.join(',')
  const rowValues = []
  const columnValues = []

  for (let columns of rows) {
    const values = []

    for (let column in columns) {
      const value = columns[column]

      values.push(value)
    }

    rowValues.push(values.map(() => '?').join(','))

    columnValues.push(...values)
  }

  const strColumnValues = rowValues.join('),(')

  const sql = `INSERT INTO ${table} (${strColumnNames}) VALUES (${strColumnValues})`

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

function rawQuery(sql, values = []) {
  return utils.query(sql, values)
}

module.exports = {
  createTable,
  dropTable,
  addColumns,
  checkIfExists,
  addRow,
  addRows,
  dropRow,
  dropColumns,
  rawQuery
}
