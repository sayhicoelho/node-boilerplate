import nodemailer from 'nodemailer'
import config from '@config'
import { dispatch } from './jobService'
import { views } from './viewService'

export const transporter = nodemailer.createTransport({
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

export function send(to, subject, view, data) {
  const html = views.emails[view](data)

  const mailOptions = {
    from: config.mail.noreply,
    to,
    subject,
    html,
  }

  dispatch('email', mailOptions)
}
