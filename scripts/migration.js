/**
 * This script creates database migrations to the project.
 *
 * Example usage:
 *
 * > yarn migration create create_users_table
 * > yarn migration up
 * > yarn migration down
 * > yarn migration down --force
 * > yarn migration reset
 * > yarn migration up --step-=1
 * > yarn migration down --step-=1
 * > yarn migration reset --step-=1
 */

const fs = require('fs')
const path = require('path')
const { db } = require('../database')
const orm = require('../database/orm')
const config = require('../config')
const args = process.argv.splice(2)
const action = args[0]

const template = `const orm = require('../orm')

function up() {
  return orm.createTable('your_table', {
    primaryKey: 'id',
    timestamps: true,
    columns: {
      id: {
        type: 'int',
        unsigned: true,
        autoIncrement: true
      },
      name: {
        type: 'varchar(255)',
      },
    },
  })
}

function down() {
  return orm.dropTable('your_table')
}

module.exports = {
  up,
  down,
}
`

const migrationsTable = 'migrations'

const migrationsDir = path.join(
  __dirname,
  '..',
  'database',
  'migrations'
)

const actions = {
  async create() {
    const now = Date.now()
    const migration = args[1]

    if (migration) {
      const file = `${now}_${migration}.js`

      fs.writeFileSync(path.join(migrationsDir, file), template)

      console.log(`Migration ${file} created`)
    } else {
      console.error('Invalid migration name.')
    }

    db.end()
  },
  async up() {
    await migrate('up')

    db.end()
  },
  async down() {
    await migrate('down')

    db.end()
  },
  async reset() {
    await migrate('down')
    await migrate('up')

    db.end()
  },
}

function migrate(param) {
  return new Promise(async resolve => {
    const force = args[1] ? args[1] == '--force' : false

    if (param == 'down' && force) {
      await orm.rawQuery('SET FOREIGN_KEY_CHECKS = 0')

      const sql = `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`
      const result = await orm.rawQuery(sql, [config.database.database])

      for (let table of result) {
        const name = table.table_name
        await orm.rawQuery(`DROP TABLE IF EXISTS ${name}`)

        console.log(`Table ${name} has been removed`)
      }

      await orm.rawQuery('SET FOREIGN_KEY_CHECKS = 1')

      console.log(`${result.length} table(s) removed`)

      return resolve()
    } else {
      const step = args[1] ? args[1].replace('--step=', '') : null

      let steps = 0

      fs.readdir(migrationsDir, async (err, files) => {
        const migrated = []

        if (param == 'down') files.reverse()

        for (let file of files) {
          const migration = require(path.join(migrationsDir, file))

          const result = await orm.checkIfExists(
            migrationsTable,
            'WHERE migration = ?',
            [file]
          )

          const { rowsCount } = result[0]

          if (
            (param == 'up' && rowsCount == 0) ||
            (param == 'down' && rowsCount > 0)
          ) {
            await migration[param]()

            if (param == 'up') {
              await orm.addRow(migrationsTable, {
                migration: file,
              })
            } else if (param == 'down') {
              await orm.dropRow(migrationsTable, 'WHERE migration = ?', [file])
            }

            migrated.push(file)

            console.log(`${param == 'up' ? 'migrate' : 'rollback'} ${file}`)

            steps++

            if (steps == step) break
          }
        }

        if (migrated.length > 0) {
          console.log(`${migrated.length} migration(s) successfully migrated`)
        } else {
          console.log('Nothing to migrate')
        }

        resolve()
      })
    }
  })
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
      const result = await orm.checkIfExists(
        'information_schema.TABLES',
        'WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
        [config.database.database, migrationsTable]
      )

      const { rowsCount } = result[0]

      if (rowsCount === 0) {
        await orm.createTable(migrationsTable, {
          primaryKey: 'id',
          timestamps: false,
          columns: {
            id: {
              type: 'INT',
              unsigned: true,
              autoIncrement: true,
            },
            migration: {
              type: 'VARCHAR(50)',
            },
          }
        })
      }

      await actions[action]()
    } else {
      console.error(
        `Action ${action} is not valid. Did you mean create|up|down|reset?`
      )

      db.end()
    }
  }
}

execute()
