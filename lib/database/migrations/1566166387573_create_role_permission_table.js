const orm = require('@database/orm')

function up() {
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
        type: 'TINYINT(1)',
        nullable: true,
      },
      canRead: {
        type: 'TINYINT(1)',
        nullable: true,
      },
      canUpdate: {
        type: 'TINYINT(1)',
        nullable: true,
      },
      canDelete: {
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
