const userService = require('./userService')

const index = (req, res) => res.json({ users: userService.getUsers() })

const getUser = (req, res) =>
  res.json({ user: userService.getUser(req.params.id) })

const createUser = (req, res) =>
  res.json({ user: userService.createUser(req.body) })

module.exports = {
  index,
  getUser,
  createUser,
}
