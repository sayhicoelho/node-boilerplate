const { Router } = require('express')
const exampleController = require('./exampleController')
const exampleUploadRequest = require('./exampleUploadRequest')
const { upload } = require('../../../../services/fileService')

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

module.exports = router
