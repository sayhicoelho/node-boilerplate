const { Router } = require('express')
const userController = require('./userController')
const userRequest = require('./userRequest')

const router = Router()

router.get('/users', userController.index)

router.get('/users/:id', userController.getUser)

router.post(
  '/users',
  userRequest.prepareForValidation,
  userRequest.validate,
  userController.createUser
)

module.exports = router
