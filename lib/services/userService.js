import * as orm from '@database/orm'

const table = 'users'
const fillable = ['name', 'email', 'password']
const hidden = ['password']
const selectable = fillable.filter(field => !hidden.includes(field))

export async function getAll(fields = selectable, perPage = null, page = null) {
  const result = await orm.select(table, fields)

  return result
}

export async function findById(id, fields = selectable) {
  const where = 'WHERE id = ?'
  const values = [id]
  const result = await orm.select(table, fields, where, values)

  return result
}

export async function create(data) {
  const result = await orm.addRow(table, data)

  return result
}

export async function updateById(id, data) {
  const where = 'WHERE id = ?'
  const fields = Object.keys(data)
  const values = [...Object.values(data), id]
  const result = orm.updateRow(table, fields, where, values)

  return result
}

export async function deleteById(id) {
  const where = 'WHERE id = ?'
  const values = [id]
  const result = await orm.dropRow(table, where, values)

  return result
}
