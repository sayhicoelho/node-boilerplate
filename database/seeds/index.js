const addRolesTableSeeder = require('./addRolesTableSeeder')
const addUsersTableSeeder = require('./addUsersTableSeeder')

async function populate() {
  await addRolesTableSeeder.run()
  await addUsersTableSeeder.run()
}

module.exports = {
  populate,
}
