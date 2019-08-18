const orm = require('../orm')

function up() {
  return orm.createTable('post_category', {
    primaryKey: 'id',
    timestamps: false,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true
      },
      postId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['posts', 'id'],
          onDelete: 'cascade',
        },
      },
      categoryId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['categories', 'id'],
          onDelete: 'cascade',
        },
      },
    },
  })
}

function down() {
  return orm.dropTable('post_category')
}

module.exports = {
  up,
  down,
}
