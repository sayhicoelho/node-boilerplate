import Queue from 'bull'
import { transporter } from '@services/mailService'
import { io } from '@services/socketService'

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

export default queue
