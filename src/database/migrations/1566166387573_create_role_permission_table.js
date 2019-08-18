const orm = require('../orm')

function up() {
  return orm.createTable('role_permission', {
    primaryKey: 'id',
    timestamps: false,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true
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
      create: {
        type: 'TINYINT(1)',
        nullable: true,
      },
      read: {
        type: 'TINYINT(1)',
        nullable: true,
      },
      update: {
        type: 'TINYINT(1)',
        nullable: true,
      },
      delete: {
        type: 'TINYINT(1)',
        nullable: true,
      },
    },
  })
}

function down() {
  return orm.dropTable('role_permission')
}

module.exports = {
  up,
  down,
}
