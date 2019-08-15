const chatService = require('../../../../services/chatService')

const index = (req, res) => {
  const chats = chatService.getAll()

  res.json({ chats })
}

module.exports = {
  index,
}
