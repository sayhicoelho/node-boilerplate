import * as userService from '@services/userService'

export function index(req, res) {
  const users = userService.getAll()

  res.json({ users })
}

export function show(req, res) {
  const user = userService.findById(req.params.id)

  res.json({ user })
}

export function store(req, res) {
  const user = userService.create(req.body)

  res.status(201).json({ user })
}

export function destroy(req, res) {
  userService.deleteById(req.params.id)

  res.status(204).json({})
}
