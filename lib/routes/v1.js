import { Router } from 'express'
import authMiddleware from '@middleware/authMiddleware'
import isAdminMiddleware from '@middleware/isAdminMiddleware'
import { v1Routes } from '../app'

const { adminRoutes, userRoutes, webRoutes } = v1Routes

const router = Router()

router.use('/admin', authMiddleware, isAdminMiddleware, adminRoutes)
router.use('/account', authMiddleware, userRoutes)
router.use('/', webRoutes)

export default router
