const { transporter } = require('../services/mailService')

const handle = ({ data }, done) => {
  const mailOptions = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    html: data.html,
  }

  transporter.sendMail(mailOptions, (err, info) => {
    done(err ? new Error(err) : '')
  })
}

module.exports = {
  handle,
}
