import cron from 'node-cron'
import * as exampleTask from './tasks/exampleTask'

cron.schedule('* * * * * *', () => {
  exampleTask.run()
})
