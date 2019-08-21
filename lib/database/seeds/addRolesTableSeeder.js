const orm = require('@database/orm')

async function run() {
  await orm.addRows('roles', [
    {
      name: 'Admin',
      slug: 'admin',
    },
    {
      name: 'Editor',
      slug: 'editor',
    },
    {
      name: 'User',
      slug: 'user',
    },
  ])
}

module.exports = {
  run,
}
