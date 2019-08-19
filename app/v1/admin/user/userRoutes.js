const { Router } = require('express')
const userController = require('./userController')
const userRequest = require('./userRequest')

const router = Router()

router.get('/users', userController.index)
router.get('/users/:id', userController.show)
router.post('/users', userRequest.validate, userController.store)
router.delete('/users/:id', userController.destroy)

module.exports = router
