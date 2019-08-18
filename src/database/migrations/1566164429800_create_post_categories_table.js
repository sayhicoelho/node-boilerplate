const orm = require('../orm')

function up() {
  return orm.createTable('post_categories', {
    primaryKey: 'id',
    timestamps: true,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true,
      },
      postId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['posts', 'id'],
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
  return orm.dropTable('post_categories')
}

module.exports = {
  up,
  down,
}
