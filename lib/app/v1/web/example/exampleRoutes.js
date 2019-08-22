import { Router } from 'express'
import * as exampleController from './exampleController'
import * as exampleUploadRequest from './exampleUploadRequest'
import { upload } from '@services/fileService'

const router = Router()

router.post('/example/email', exampleController.email)
router.post('/example/notification', exampleController.notification)
router.get('/example/find-user/:id', exampleController.findUser)

router.post(
  '/example/upload',
  upload('image').single('avatar'),
  exampleUploadRequest.validate,
  exampleController.upload
)

export default router
