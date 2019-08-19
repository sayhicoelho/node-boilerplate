/**
 * This script populates the database with data.
 *
 * Example usage:
 *
 * > yarn seed create addUsersTableSeeder
 * > yarn populate
 * > yarn populate --name=addUsersTableSeeder
 */

const fs = require('fs')
const path = require('path')
const { db } = require('../src/database')
const args = process.argv.splice(2)
const [action] = args

const template = `const orm = require('../orm')

function run() {
  return orm.addRow('users', {
    name: 'Example',
    email: 'example@example.com',
    password: 'secret',
  })
}

module.exports = run
`

const seedsDir = path.join(__dirname, '..', 'src', 'database', 'seeds')

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

    db.end()
  },
  async populate() {
    return new Promise(async resolve => {
      const name = args[1] ? args[1].replace('--name=', '') : ''

      if (name) {
        const seed = `${name}.js`
        const filePath = path.join(seedsDir, seed)
        const exists = fs.existsSync(filePath)

        if (exists) {
          await require(filePath)()

          console.log(`${seed} populated`)
        } else {
          console.error(`The seed ${name} does not exists`)
        }

        db.end()

        resolve()
      } else {
        await require(path.join(seedsDir)).populate()

        console.log(`Seed(s) populated`)

        db.end()

        resolve()
      }
    })
  },
}

async function execute(bypass = false) {
  if (!bypass && process.env.NODE_ENV === 'production') {
    console.log(
      "Caution! You're running in production mode. Are you sure you want to proceed (yes|no)?"
    )

    const ask = async () => {
      let answer = process.stdin.read()

      if (answer) {
        answer = answer.toString().trim()

        if (answer == 'yes') {
          await execute(true)
        } else {
          db.end()
        }

        process.exit(0)
      }
    }

    process.stdin.on('readable', ask)
  } else {
    if (action in actions) {
      await actions[action]()
    } else {
      console.error(
        `Action ${action} is not valid. Did you mean create|populate?`
      )

      db.end()
    }
  }
}

execute()
