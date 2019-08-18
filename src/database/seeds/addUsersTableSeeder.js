const orm = require('../orm')

async function run() {
  return orm.addRow('users', {
    name: 'Example',
    email: 'example@example.com',
    password: 'secret',
  })
}

module.exports = run
