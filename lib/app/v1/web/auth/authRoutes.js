import { Router } from 'express'
import * as authController from './authController'
import * as registerRequest from './registerRequest'

const router = Router()

router.post('/login', authController.login)
router.post('/register', registerRequest.validate, authController.register)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)
router.post('/verifyEmail', authController.verifyEmail)

export default router
