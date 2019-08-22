import * as orm from '@database/orm'
import { hash } from '@utils/helpers'

export async function run() {
  await orm.addRow('users', {
    name: 'Example',
    email: 'example@example.com',
    password: await hash('secret'),
  })
}
