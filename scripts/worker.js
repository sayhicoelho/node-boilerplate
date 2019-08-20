const Queue = require('bull')
const mailJob = require('../jobs/mailJob')

const emailQueue = new Queue('email')

emailQueue.process((job, done) => {
  console.log(`Processing job ${job.id}...`)

  mailJob.handle(job, done)
})

emailQueue.on('completed', job => console.log(`Job ${job.id} completed.`))
