const orm = require('../orm')
const helpers = require('../../utils/helpers')

async function run() {
  return orm.addRow('users', {
    name: 'Example',
    email: 'example@example.com',
    password: await helpers.hash('secret'),
  })
}

module.exports = {
  run,
}
