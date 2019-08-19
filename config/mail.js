module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  secure: process.env.MAIL_SECURE === 'true',
  rejectUnauthorized: process.env.MAIL_REJECT_UNAUTHORIZED === 'true',
  ciphers: process.env.MAIL_CIPHERS,
  noreply: process.env.MAIL_NOREPLY,
  support: process.env.MAIL_SUPPORT,
  billing: process.env.MAIL_BILLING,
}
