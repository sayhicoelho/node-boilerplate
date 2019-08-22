import { Router } from 'express'
import * as postController from './postController'

const router = Router()

router.get('/posts', postController.index)
router.get('/posts/:id', postController.show)

export default router
