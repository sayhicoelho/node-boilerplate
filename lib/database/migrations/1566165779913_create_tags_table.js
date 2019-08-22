import * as orm from '@database/orm'

export function up() {
  return orm.createTable('tags', {
    primaryKey: 'id',
    timestamps: true,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true,
      },
      name: {
        type: 'varchar(50)',
      },
      slug: {
        type: 'varchar(50)',
        unique: true,
      },
    },
  })
}

export function down() {
  return orm.dropTable('tags')
}
