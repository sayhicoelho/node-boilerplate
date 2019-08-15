const { Router } = require('express')
const chatController = require('./chatController')
const messageController = require('./messageController')
const messageRequest = require('./messageRequest')

const router = Router()

router.get('/chats', chatController.index)
router.get('/chats/:id/messages', messageController.index)
router.post(
  '/chats/:id/messages',
  messageRequest.validate,
  messageController.store
)

router.delete('/messages/:id', messageController.destroy)

module.exports = router
