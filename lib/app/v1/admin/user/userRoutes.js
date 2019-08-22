import { Router } from 'express'
import * as userController from './userController'
import * as userRequest from './userRequest'

const router = Router()

router.get('/users', userController.index)
router.get('/users/:id', userController.show)
router.post('/users', userRequest.validate, userController.store)
router.delete('/users/:id', userController.destroy)

export default router
