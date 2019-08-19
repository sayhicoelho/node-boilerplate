const cron = require('node-cron')
const loggerTask = require('../tasks/loggerTask')

cron.schedule('* * * * * *', () => {
  loggerTask.run()
})
