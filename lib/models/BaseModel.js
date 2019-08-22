import * as orm from '@database/orm'

class BaseModel {
  table = 'table_name'
  fillable = []
  hidden = []

  getTable() {
    return this.table
  }

  async findById(id, columns = null) {
    columns = columns || this.safeColumns()
    const where = 'WHERE id = ?'
    const values = [id]
    const result = await orm.select(this.table, columns, where, values)

    return result
  }

  async findBySlug(slug, columns = null) {
    columns = columns || this.safeColumns()
    const where = 'WHERE slug = ?'
    const values = [slug]
    const result = await orm.select(this.table, columns, where, values)

    return result
  }

  safeColumns() {
    return this.fillable.filter(field => !this.hidden.includes(field))
  }
}

export default BaseModel
