const { transporter } = require('../services/mailService')
const { io } = require('../services/socketService')

const handle = ({ data }, done) => {
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
}

module.exports = {
  handle,
}
