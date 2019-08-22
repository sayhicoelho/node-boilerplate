import { Router } from 'express'
import * as roleController from './roleController'
import * as roleRequest from './roleRequest'

const router = Router()

router.get('/roles', roleController.index)
router.get('/roles/:id', roleController.show)
router.post('/roles', roleRequest.validate, roleController.store)
router.delete('/roles/:id', roleController.destroy)

export default router
