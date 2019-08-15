const { Router } = require('express')
const postController = require('./postController')
const postRequest = require('./postRequest')

const router = Router()

router.get('/post', postController.index)
router.get('/post/:id', postController.show)
router.post('/post', postRequest.validate, postController.store)
router.delete('/post/:id', postController.destroy)

module.exports = router
