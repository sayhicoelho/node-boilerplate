const Queue = require('bull')

const emailQueue = new Queue('email')

emailQueue.process((job, done) => {
  console.log(`Processing job ${job.id}...`)
  console.log(job.data)

  setTimeout(() => {
    console.log(`Job ${job.id} finished.`)
    done()
  }, 1500)
})

emailQueue.add({
  from: 'from@example.com',
  to: 'to@example.com',
  subject: 'Subject',
  body: '<h1>Hello!</h1>'
})
