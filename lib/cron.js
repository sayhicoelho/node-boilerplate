const cron = require('node-cron')
const exampleTask = require('./tasks/exampleTask')

cron.schedule('* * * * * *', () => {
  exampleTask.run()
})
