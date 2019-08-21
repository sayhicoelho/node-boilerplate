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
const { db } = require('../lib/database')
const orm = require('../lib/database/orm')
const config = require('../lib/config')
const { prompt } = require('./utils')
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
  'lib',
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
      await orm.disableForeignKeyChecks()

      const tables = await orm.getAllTables(config.database.database)

      for (let table of tables) {
        const name = table.table_name
        await orm.dropTable(name)

        console.log(`Table ${name} has been removed`)
      }

      await orm.enableForeignKeyChecks()

      console.log(`${tables.length} table(s) removed`)

      return resolve()
    } else {
      const step = args[1] ? args[1].replace('--step=', '') : null

      let steps = 0

      fs.readdir(migrationsDir, async (err, files) => {
        const migrated = []

        if (param == 'down') files.reverse()

        for (let file of files) {
          const migration = require(path.join(migrationsDir, file))

          const { rowsCount } = await orm.checkIfExists(
            migrationsTable,
            'WHERE migration = ?',
            [file]
          )

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

async function execute() {
  if (action in actions) {
    const { exists } = await orm.checkIfExists(
      'information_schema.TABLES',
      'WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [config.database.database, migrationsTable]
    )

    if (exists) {
      await orm.createTable(migrationsTable, {
        primaryKey: 'id',
        timestamps: false,
        columns: {
          id: {
            type: 'int',
            unsigned: true,
            autoIncrement: true,
          },
          migration: {
            type: 'varchar(50)',
          },
        },
      })
    }

    await actions[action]()
  } else {
    console.error(
      `Action ${action} is not valid. Did you mean create|up|down|reset?`
    )
  }
}

prompt(execute)
