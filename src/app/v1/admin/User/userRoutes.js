const { Router } = require('express')
const userController = require('./userController')
const userRequest = require('./userRequest')

const router = Router()

router.get('/user', userController.index)
router.get('/user/:id', userController.show)
router.post('/user', userRequest.validate, userController.store)
router.delete('/user/:id', userController.destroy)

module.exports = router
