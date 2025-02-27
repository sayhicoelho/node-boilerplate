/**
 * This script populates the database with data.
 *
 * Example usage:
 *
 * > yarn seed create addUsersTableSeeder
 * > yarn populate
 * > yarn populate --name=addUsersTableSeeder
 */

import fs from 'fs'
import path from 'path'
import { prompt } from './utils'

const args = process.argv.splice(2)
const [action] = args

const template = `import * as orm from '@database/orm'

export async function run() {
  await orm.addRow('users', {
    name: 'Example',
    email: 'example@example.com',
    password: 'secret',
  })
}
`

const seedsDir = path.join(__dirname, '..', 'lib', 'database', 'seeds')

const actions = {
  async create() {
    const seed = args[1]

    if (seed) {
      const file = `${seed}.js`
      const filePath = path.join(seedsDir, file)
      const exists = fs.existsSync(filePath)

      if (!exists) {
        fs.writeFileSync(filePath, template)

        console.log(`Seed ${file} created`)
      } else {
        console.error(`The seed ${file} already exists`)
      }
    } else {
      console.error('Invalid seed name.')
    }
  },
  async populate() {
    return new Promise(async resolve => {
      const name = args[1] ? args[1].replace('--name=', '') : ''

      if (name) {
        const seed = `${name}.js`
        const filePath = path.join(seedsDir, seed)
        const exists = fs.existsSync(filePath)

        if (exists) {
          await require(filePath).run()

          console.log(`${seed} populated`)
        } else {
          console.error(`The seed ${name} does not exists`)
        }

        resolve()
      } else {
        await require(path.join(seedsDir)).populate()

        console.log(`Seed(s) populated`)

        resolve()
      }
    })
  },
}

async function execute() {
  if (action in actions) {
    await actions[action]()
  } else {
    console.error(
      `Action ${action} is not valid. Did you mean create|populate?`
    )
  }
}

prompt(execute)
