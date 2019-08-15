const { Router } = require('express')
const blogController = require('./blogController')

const router = Router()

router.get('/blog', blogController.index)
router.get('/blog/:id', blogController.show)

module.exports = router
