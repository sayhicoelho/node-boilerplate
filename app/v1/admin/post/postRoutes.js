const { Router } = require('express')
const postController = require('./postController')
const postRequest = require('./postRequest')

const router = Router()

router.get('/posts', postController.index)
router.get('/posts/:id', postController.show)
router.post('/posts', postRequest.validate, postController.store)
router.delete('/posts/:id', postController.destroy)

module.exports = router
