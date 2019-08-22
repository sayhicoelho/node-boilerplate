import * as orm from '@database/orm'

export async function run() {
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
