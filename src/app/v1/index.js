const { Router } = require('express')

const adminRoutes = Router()
const accountRoutes = Router()
const webRoutes = Router()

adminRoutes.use(require('./admin/Post/postRoutes'))
adminRoutes.use(require('./admin/Profile/profileRoutes'))
adminRoutes.use(require('./admin/Role/roleRoutes'))
adminRoutes.use(require('./admin/User/userRoutes'))

accountRoutes.use(require('./account/Profile/profileRoutes'))

webRoutes.use(require('./web/Blog/blogRoutes'))

module.exports = {
  adminRoutes,
  accountRoutes,
  webRoutes,
}
