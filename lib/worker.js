const queues = [require('./jobs/mailJob')]

for (let queue of queues) {
  queue.on('active', job => {
    const startedAt = new Date(job.processedOn).toUTCString()
    console.log(
      `Processing job ${job.id} on queue ${job.queue.name} at ${startedAt}...`
    )
  })

  queue.on('completed', job => {
    const seconds = (job.finishedOn - job.processedOn) / 1000
    console.log(
      `Job ${job.id} on queue ${job.queue.name} has been completed in ${seconds} seconds.`
    )
  })
}
