const mailService = require('../../../../services/mailService')
const dateService = require('../../../../services/dateService')
const { io } = require('../../../../services/socketService')
const { __ } = require('../../../../i18n')

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

module.exports = {
  email,
  upload,
}
