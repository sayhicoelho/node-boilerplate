const mailService = require('../../../../services/mailService')
const { io } = require('../../../../services/socketService')
const { __ } = require('../../../../i18n')
const dateService = require('../../../../services/dateService')

const login = (req, res) => {
  res.json({ success: true })
}

const register = (req, res) => {
  const { lang, timezone } = res.locals
  const date = new Date()
  const format = 'datetime'
  const message = dateService.format(date, format, lang, timezone)
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

  res.json({ message: `Registered at ${message}` })
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

const uploadAvatar = (req, res) => {
  const { filename } = req.file

  // TODO: Add filename to database and attach it to authenticated user

  res.status(201).json({ filename })
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
  uploadAvatar,
}
