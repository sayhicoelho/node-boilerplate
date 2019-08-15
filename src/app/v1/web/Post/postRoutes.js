const { Router } = require('express')
const postController = require('./postController')

const router = Router()

router.get('/post', postController.index)
router.get('/post/:id', postController.show)

module.exports = router
