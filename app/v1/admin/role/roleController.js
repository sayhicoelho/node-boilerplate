const roleService = require('../../../../services/roleService')

const index = (req, res) => {
  const roles = roleService.getAll()

  res.json({ roles })
}

const show = (req, res) => {
  const role = roleService.findById(req.params.id)

  res.json({ role })
}

const store = (req, res) => {
  const role = roleService.create(req.body)

  res.status(201).json({ role })
}

const destroy = (req, res) => {
  roleService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
