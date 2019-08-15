const { Router } = require('express')
const roleController = require('./roleController')
const roleRequest = require('./roleRequest')

const router = Router()

router.get('/roles', roleController.index)
router.get('/roles/:id', roleController.show)
router.post('/roles', roleRequest.validate, roleController.store)
router.delete('/roles/:id', roleController.destroy)

module.exports = router
