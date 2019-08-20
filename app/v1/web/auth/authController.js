const mailService = require('../../../../services/mailService')
const { io } = require('../../../../services/socketService')
const { __ } = require('../../../../i18n')

const login = (req, res) => {
  res.json({ success: true })
}

const register = (req, res) => {
  const { lang } = res.locals
  const monkeys = 6
  const people = 8
  const birds = 10
  const data = {
    greeting: __('Hello', lang, {
      name: 'Renan',
    }),
    monkeys: __('Monkeys in the tree', lang, {
      monkeys,
      people,
      birds,
    }),
  }

  mailService.send(
    'registered@user.com',
    __('Thank you for registering!', lang),
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
