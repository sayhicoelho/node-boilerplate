const chatService = require('../../../../services/chatService')

const index = (req, res) => {
  const chats = chatService.getAll()

  res.json({ chats })
}

const store = (req, res) => {
  const chat = chatService.create(req.body)

  res.status(201).json({ chat })
}

const destroy = (req, res) => {
  chatService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  store,
  destroy,
}
