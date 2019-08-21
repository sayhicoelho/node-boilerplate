const { Router } = require('express')
const postController = require('./postController')

const router = Router()

router.get('/posts', postController.index)
router.get('/posts/:id', postController.show)

module.exports = router
