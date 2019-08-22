import { Router } from 'express'
import * as categoryController from './categoryController'
import * as categoryRequest from './categoryRequest'

const router = Router()

router.get('/categories', categoryController.index)
router.get('/categories/:id', categoryController.show)
router.post('/categories', categoryRequest.validate, categoryController.store)
router.delete('/categories/:id', categoryController.destroy)

export default router
