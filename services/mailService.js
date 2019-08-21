const nodemailer = require('nodemailer')
const config = require('../config')
const { dispatch } = require('./jobService')
const { views } = require('./viewService')

const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.secure,
  auth: {
    user: config.mail.username,
    pass: config.mail.password,
  },
  tls: {
    rejectUnauthorized: config.mail.rejectUnauthorized,
    ciphers: config.mail.ciphers,
  },
})

function send(to, subject, view, data) {
  const html = views.emails[view](data)

  const mailOptions = {
    from: config.mail.noreply,
    to,
    subject,
    html,
  }

  dispatch('email', mailOptions)
}

module.exports = {
  transporter,
  send,
}
