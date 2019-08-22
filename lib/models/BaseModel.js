import * as orm from '@database/orm'

class BaseModel {
  table = 'table_name'
  fillable = []
  hidden = []

  getTable() {
    return this.table
  }

  async findBy(key, value, columns = null) {
    columns = columns || this.safeColumns()
    const where = `WHERE ${key} = ?`
    const values = [value]
    const result = await orm.select(this.table, columns, where, values)

    return result
  }

  async findById(id, columns = null) {
    return await this.findBy('id', id, columns)
  }

  async findBySlug(slug, columns = null) {
    return await this.findBy('slug', slug, columns)
  }

  async updateById(id, columns, values) {
    // TODO: Update model
  }

  async softDeleteById(id) {
    // TODO: Update column 'deleted_at' with current timestamp
  }

  async deleteById(id) {
    // TODO: Delete model
  }

  async create(columns) {
    const result = await orm.addRow(this.table, columns)

    return result
  }

  safeColumns() {
    return this.fillable.filter(field => !this.hidden.includes(field))
  }
}

export default BaseModel
