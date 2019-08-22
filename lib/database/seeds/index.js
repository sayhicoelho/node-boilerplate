import * as addRolesTableSeeder from './addRolesTableSeeder'
import * as addUsersTableSeeder from './addUsersTableSeeder'

export async function populate() {
  await addRolesTableSeeder.run()
  await addUsersTableSeeder.run()
}
