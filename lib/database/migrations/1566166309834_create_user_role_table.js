import * as orm from '@database/orm'

export function up() {
  return orm.createTable('user_role', {
    primaryKey: 'id',
    timestamps: false,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true,
      },
      userId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['users', 'id'],
          onDelete: 'cascade',
        },
      },
      roleId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['roles', 'id'],
          onDelete: 'cascade',
        },
      },
    },
  })
}

export function down() {
  return orm.dropTable('user_role')
}
