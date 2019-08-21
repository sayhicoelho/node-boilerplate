const orm = require('@database/orm')

function up() {
  return orm.createTable('roles', {
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

function down() {
  return orm.dropTable('roles')
}

module.exports = {
  up,
  down,
}
