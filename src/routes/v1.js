const { Router } = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const isAdminMiddleware = require('../middleware/isAdminMiddleware')
const { v1Routes } = require('../app')
const { adminRoutes, userRoutes, webRoutes } = v1Routes

const router = Router()

router.use('/admin', authMiddleware, isAdminMiddleware, adminRoutes)
router.use('/account', authMiddleware, userRoutes)
router.use('/', webRoutes)

module.exports = router
