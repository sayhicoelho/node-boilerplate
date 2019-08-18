const fs = require('fs')
const path = require('path')
const { db } = require('../src/database')
const orm = require('../src/database/orm')
const config = require('../src/config')
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
  'src',
  'database',
  'migrations'
)

const actions = {
  create() {
    const now = Date.now()
    const migration = args[1]

    if (migration) {
      fs.writeFileSync(
        path.join(migrationsDir, `${now}_${migration}.js`),
        template
      )
    } else {
      console.error("Invalid migration's name.") && db.end()
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
  return new Promise(resolve => {
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
  })
}

async function execute() {
  if (action in actions) {
    const result = await orm.checkIfExists(
      'information_schema.TABLES',
      'WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [config.database.database, migrationsTable]
    )

    const { rowsCount } = result[0]

    if (rowsCount === 0) {
      await orm.createTable(migrationsTable, {
        migration: {
          type: 'VARCHAR(50)',
        },
      })
    }

    actions[action]()
  } else {
    console.error(`Action ${action} is not valid. Did you mean create|up|down?`)

    db.end()
  }
}

execute()
