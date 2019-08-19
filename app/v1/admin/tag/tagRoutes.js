const { Router } = require('express')
const tagController = require('./tagController')
const tagRequest = require('./tagRequest')

const router = Router()

router.get('/tags', tagController.index)
router.get('/tags/:id', tagController.show)
router.post('/tags', tagRequest.validate, tagController.store)
router.delete('/tags/:id', tagController.destroy)

module.exports = router
