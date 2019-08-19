const { Router } = require('express')
const categoryController = require('./categoryController')
const categoryRequest = require('./categoryRequest')

const router = Router()

router.get('/categories', categoryController.index)
router.get('/categories/:id', categoryController.show)
router.post('/categories', categoryRequest.validate, categoryController.store)
router.delete('/categories/:id', categoryController.destroy)

module.exports = router
