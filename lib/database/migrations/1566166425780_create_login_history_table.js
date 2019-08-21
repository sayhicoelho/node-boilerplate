const orm = require('@database/orm')

function up() {
  return orm.createTable('login_history', {
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
      userAgent: {
        type: 'varchar(255)',
      },
      ip: {
        type: 'varchar(15)',
      },
    },
  })
}

function down() {
  return orm.dropTable('login_history')
}

module.exports = {
  up,
  down,
}
