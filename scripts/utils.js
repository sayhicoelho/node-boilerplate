const config = require('../lib/config')
const { db } = require('../lib/database')

async function prompt(callback) {
  if (config.app.env == 'production') {
    console.log(
      "Caution! You're running in production mode. Are you sure you want to proceed (yes|no)?"
    )

    const ask = async () => {
      let answer = process.stdin.read()

      if (answer) {
        answer = answer.toString().trim()

        if (answer == 'yes') {
          await callback()
        }

        db.end()

        process.exit(0)
      }
    }

    process.stdin.on('readable', ask)
  } else {
    await callback()
    db.end()
  }
}

module.exports = {
  prompt,
}
