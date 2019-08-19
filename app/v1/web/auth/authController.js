const mailService = require('../../../../services/mailService')
const { io } = require('../../../../services/socketService')

const login = (req, res) => {
  res.json({ success: true })
}

const register = (req, res) => {
  const data = {
    greeting: 'Dear User',
  }

  mailService.send(
    'registered@user.com',
    'Thank you for registering!',
    'register',
    data
  )

  io.emit('rest message', 'rest message sent')

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
