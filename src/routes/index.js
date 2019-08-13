const { Router } = require('express')
const userRoutes = require('../modules/user/userRoutes')

const router = Router()

router.use(userRoutes)

module.exports = router
