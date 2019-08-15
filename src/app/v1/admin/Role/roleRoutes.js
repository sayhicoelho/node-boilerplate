const { Router } = require('express')
const roleController = require('./roleController')
const roleRequest = require('./roleRequest')

const router = Router()

router.get('/role', roleController.index)
router.get('/role/:id', roleController.show)
router.post('/role', roleRequest.validate, roleController.store)
router.delete('/role/:id', roleController.destroy)

module.exports = router
