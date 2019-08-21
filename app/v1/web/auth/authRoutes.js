const { Router } = require('express')
const authController = require('./authController')
const registerRequest = require('./registerRequest')
const uploadAvatarRequest = require('./uploadAvatarRequest')
const { upload } = require('../../../../services/fileService')

const router = Router()

router.post('/login', authController.login)
router.post('/register', registerRequest.validate, authController.register)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.post('/verifyEmail', authController.verifyEmail)
router.post(
  '/uploadAvatar',
  upload('img').single('avatar'),
  uploadAvatarRequest.validate,
  authController.uploadAvatar
)

module.exports = router
