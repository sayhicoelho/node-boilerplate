import * as orm from '@database/orm'

export function up() {
  return orm.addColumns('posts', {
    status: {
      type: "enum('published', 'pending')",
      default: "'pending'",
    },
  })
}

export function down() {
  return orm.dropColumns('posts', ['status'])
}
