const orm = require('@database/orm')

// class BaseModel {
//   static table = 'table_name'
//   static fillable = []
//   static hidden = []

//   async static findById(id, columns = ['*']) {
//     const result = await orm.select(this.table, columns, 'WHERE id = ?', [id])

//     return result
//   }

//   static findBySlug(slug) {}
// }

// module.exports = BaseModel

async function findById(table, columns, id) {
  const where = 'WHERE id = ?'
  const values = [id]
  const result = await orm.select(table, columns, where, values)

  return result
}

module.exports = {
  findById,
}
