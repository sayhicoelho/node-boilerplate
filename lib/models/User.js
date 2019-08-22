import * as orm from '@database/orm'
import BaseModel from './BaseModel'

class User extends BaseModel {
  table = 'users'
  fillable = ['name', 'email', 'password']
  hidden = ['password']

  async findAdminUsers(columns = null) {
    columns = columns || this.safeColumns()
    const where = 'WHERE admin = true'
    const result = await orm.select(this.table, columns, where)

    return result
  }
}

export default new User()
