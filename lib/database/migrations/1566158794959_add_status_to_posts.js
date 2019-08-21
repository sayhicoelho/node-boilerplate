const orm = require('@database/orm')

function up() {
  return orm.addColumns('posts', {
    status: {
      type: "enum('published', 'pending')",
      default: "'pending'",
    },
  })
}

function down() {
  return orm.dropColumns('posts', ['status'])
}

module.exports = {
  up,
  down,
}
