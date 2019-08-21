// const BaseModel = require('./BaseModel')
const BaseModel = require('./BaseModel')
const { safeColumns } = require('./utils')
const orm = require('@database/orm')

// class User extends BaseModel {
//   static table = 'users'
//   static fillable = ['name', 'email', 'password']
//   static hidden = ['password']
// }

const table = 'users'
const fillable = ['name', 'email', 'password']
const hidden = ['password']
const selectable = safeColumns(fillable, hidden)

function getTable() {
  return table
}

async function findAdminUsers(columns = null) {
  columns = columns || selectable
  const where = 'WHERE admin = true'
  const result = await orm.select(table, columns, where)

  return result
}

async function findById(id, columns = null) {
  columns = columns || selectable
  const result = await BaseModel.findById(table, columns, id)

  return result
}

module.exports = {
  getTable,
  findAdminUsers,
  findById,
}
