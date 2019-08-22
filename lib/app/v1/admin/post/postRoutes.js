import { Router } from 'express'
import * as postController from './postController'
import * as postRequest from './postRequest'

const router = Router()

router.get('/posts', postController.index)
router.get('/posts/:id', postController.show)
router.post('/posts', postRequest.validate, postController.store)
router.delete('/posts/:id', postController.destroy)

export default router
