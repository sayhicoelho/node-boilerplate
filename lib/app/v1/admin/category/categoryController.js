import * as categoryService from '@services/categoryService'

export function index(req, res) {
  const categories = categoryService.getAll()

  res.json({ categories })
}

export function show(req, res) {
  const category = categoryService.findById(req.params.id)

  res.json({ category })
}

export function store(req, res) {
  const category = categoryService.create(req.body)

  res.status(201).json({ category })
}

export function destroy(req, res) {
  categoryService.deleteById(req.params.id)

  res.status(204).json({})
}
