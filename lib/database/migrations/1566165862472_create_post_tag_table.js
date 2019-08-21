const orm = require('../orm')

function up() {
  return orm.createTable('post_tag', {
    primaryKey: 'id',
    timestamps: false,
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
      tagId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['tags', 'id'],
          onDelete: 'cascade',
        },
      },
    },
  })
}

function down() {
  return orm.dropTable('post_tag')
}

module.exports = {
  up,
  down,
}
