const orm = require('../orm')

function up() {
  return orm.createTable('users', {
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
      email: {
        type: 'varchar(50)',
        unique: true,
      },
      password: {
        type: 'varchar(60)',
      },
    },
  })
}

function down() {
  return orm.dropTable('users')
}

module.exports = {
  up,
  down,
}
