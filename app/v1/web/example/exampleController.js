const mailService = require('../../../../services/mailService')
const dateService = require('../../../../services/dateService')
const notificationService = require('../../../../services/notificationService')
const { io } = require('../../../../services/socketService')
const { __ } = require('../../../../i18n')
const User = require('../../../../models/User')

const email = (req, res) => {
  const { lang, timezone } = res.locals
  const monkeys = 6
  const people = 8
  const birds = 10

  // Example sending emails
  const to = '"Example" <user@example.com>'
  const subject = __('Thank you for registering!', lang)
  const view = 'example'
  const data = {
    greeting: __('Hello', lang, {
      name: 'Example',
    }),
    monkeys: __('Monkeys in the tree', lang, {
      monkeys,
      people,
      birds,
    }),
  }

  mailService.send(to, subject, view, data)

  // Example sending messages through sockets
  const date = new Date()
  const format = 'datetime'
  const message = dateService.format(date, format, lang, timezone)

  io.emit('rest message', 'rest message sent')

  res.json({ message: `Registered at ${message}` })
}

const upload = (req, res) => {
  const { filename } = req.file

  // TODO: Add filename to database and attach it to authenticated user

  res.status(201).json({ filename })
}

const notification = async (req, res) => {
  const headings = {
    en: 'Node.js notification',
  }

  const contents = {
    en: "This is the notification's body.",
  }

  const segments = ['Active Users', 'Inactive Users']

  try {
    await notificationService.sendNotification(headings, contents, segments)
    res.json({ message: 'Notifications sent.' })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
}

const findUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  res.json({ user })
}

module.exports = {
  email,
  upload,
  notification,
  findUser,
}
