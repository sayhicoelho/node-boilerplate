const userService = require('./userService')
const userEvents = require('./userEvents')

const index = (req, res) => res.json({ users: userService.getUsers() })

const getUser = (req, res) =>
  res.json({ user: userService.getUser(req.params.id) })

const createUser = (req, res) => {
  const user = userService.createUser(req.body)

  res.json({ user })

  userEvents.emit('user.registered', user)
}

module.exports = {
  index,
  getUser,
  createUser,
}
