const roleService = require('../../../../services/roleService')

function index(req, res) {
  const roles = roleService.getAll()

  res.json({ roles })
}

function show(req, res) {
  const role = roleService.findById(req.params.id)

  res.json({ role })
}

function store(req, res) {
  const role = roleService.create(req.body)

  res.status(201).json({ role })
}

function destroy(req, res) {
  roleService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
