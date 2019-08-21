const orm = require('@database/orm')

function up() {
  return orm.createTable('categories', {
    primaryKey: 'id',
    timestamps: true,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true,
      },
      parentId: {
        type: 'int',
        unsigned: true,
        nullable: true,
        foreign: {
          ref: ['categories', 'id'],
          onDelete: 'cascade',
        },
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
  return orm.dropTable('categories')
}

module.exports = {
  up,
  down,
}
