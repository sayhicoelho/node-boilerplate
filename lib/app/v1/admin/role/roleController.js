import * as roleService from '@services/roleService'

export function index(req, res) {
  const roles = roleService.getAll()

  res.json({ roles })
}

export function show(req, res) {
  const role = roleService.findById(req.params.id)

  res.json({ role })
}

export function store(req, res) {
  const role = roleService.create(req.body)

  res.status(201).json({ role })
}

export function destroy(req, res) {
  roleService.deleteById(req.params.id)

  res.status(204).json({})
}
