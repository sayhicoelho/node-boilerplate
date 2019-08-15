const { Router } = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const isAdminMiddleware = require('../middleware/isAdminMiddleware')
const { adminRoutes, accountRoutes, webRoutes } = require('../app/v1')

const router = Router()

router.use('/admin', authMiddleware, isAdminMiddleware, adminRoutes)
router.use('/account', authMiddleware, accountRoutes)
router.use('/', webRoutes)

module.exports = router
