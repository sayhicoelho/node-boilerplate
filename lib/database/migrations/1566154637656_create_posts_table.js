import * as orm from '@database/orm'

export function up() {
  return orm.createTable('posts', {
    primaryKey: 'id',
    timestamps: true,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true,
      },
      authorId: {
        type: 'int',
        unsigned: true,
        foreign: {
          ref: ['users', 'id'],
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
      title: {
        type: 'varchar(100)',
        default: "'My title goes here'",
      },
      slug: {
        type: 'varchar(100)',
        unique: true,
      },
      body: {
        type: 'text',
      },
      excerpt: {
        type: 'varchar(100)',
      },
    },
  })
}

export function down() {
  return orm.dropTable('posts')
}
