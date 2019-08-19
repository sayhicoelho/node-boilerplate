const { Router } = require('express')
const authController = require('./authController')
const registerRequest = require('./registerRequest')

const router = Router()

router.post('/login', authController.login)
router.post('/register', registerRequest.validate, authController.register)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.post('/verifyEmail', authController.verifyEmail)

module.exports = router
