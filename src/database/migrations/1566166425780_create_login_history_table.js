const orm = require('../orm')

function up() {
  return orm.createTable('login_history', {
    primaryKey: 'id',
    timestamps: true,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true
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
