const Queue = require('bull')
const { transporter } = require('@services/mailService')
const { io } = require('@services/socketService')

const queue = new Queue('email')

queue.process(({ data }, done) => {
  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    html: data.html,
  }

  io.emit('job message', 'job message sent')

  transporter.sendMail(mailOptions, (err, info) => {
    done(err ? new Error(err) : '')
  })
})

module.exports = queue
