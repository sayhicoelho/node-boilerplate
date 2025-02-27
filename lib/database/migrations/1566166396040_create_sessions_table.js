import * as orm from '@database/orm'

export function up() {
  return orm.createTable('sessions', {
    primaryKey: 'id',
    timestamps: true,
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
      token: {
        type: 'varchar(255)',
      },
      userAgent: {
        type: 'varchar(255)',
      },
      ip: {
        type: 'varchar(15)',
      },
      pushSubscription: {
        type: 'JSON',
        nullable: true,
      },
    },
  })
}

export function down() {
  return orm.dropTable('sessions')
}
