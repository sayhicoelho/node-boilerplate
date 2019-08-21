const userService = require('../../../../services/userService')

function index(req, res) {
  const users = userService.getAll()

  res.json({ users })
}

function show(req, res) {
  const user = userService.findById(req.params.id)

  res.json({ user })
}

function store(req, res) {
  const user = userService.create(req.body)

  res.status(201).json({ user })
}

function destroy(req, res) {
  userService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
