const { Router } = require('express')

const adminRoutes = Router()
const accountRoutes = Router()
const webRoutes = Router()

adminRoutes.use(require('./admin/post/postRoutes'))
adminRoutes.use(require('./admin/role/roleRoutes'))
adminRoutes.use(require('./admin/user/userRoutes'))

accountRoutes.use(require('./account/profile/profileRoutes'))

webRoutes.use(require('./web/post/postRoutes'))

module.exports = {
  adminRoutes,
  accountRoutes,
  webRoutes,
}
