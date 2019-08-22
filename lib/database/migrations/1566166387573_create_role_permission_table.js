import * as orm from '@database/orm'

export function up() {
  return orm.createTable('role_permission', {
    primaryKey: 'id',
    timestamps: false,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true,
      },
      roleId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['roles', 'id'],
          onDelete: 'cascade',
        },
      },
      permissionId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['permissions', 'id'],
          onDelete: 'cascade',
        },
      },
      canCreate: {
        type: 'tinyint(1)',
        nullable: true,
      },
      canRead: {
        type: 'tinyint(1)',
        nullable: true,
      },
      canUpdate: {
        type: 'tinyint(1)',
        nullable: true,
      },
      canDelete: {
        type: 'tinyint(1)',
        nullable: true,
      },
    },
  })
}

export function down() {
  return orm.dropTable('role_permission')
}
