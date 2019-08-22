import { Router } from 'express'
import * as tagController from './tagController'
import * as tagRequest from './tagRequest'

const router = Router()

router.get('/tags', tagController.index)
router.get('/tags/:id', tagController.show)
router.post('/tags', tagRequest.validate, tagController.store)
router.delete('/tags/:id', tagController.destroy)

export default router
