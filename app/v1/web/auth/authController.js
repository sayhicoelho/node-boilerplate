const { dispatch } = require('../../../../services/jobService')

const login = (req, res) => {
  res.json({ success: true })
}

const register = (req, res) => {
  dispatch('email', {
    from: 'test',
    to: 'test',
    subject: 'test',
    body: '<h1>test!</h1>'
  })

  res.json({ register: true })
}

const forgotPassword = (req, res) => {
  res.json({ success: true })
}

const resetPassword = (req, res) => {
  res.json({ success: true })
}

const verifyEmail = (req, res) => {
  res.json({ success: true })
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
}
