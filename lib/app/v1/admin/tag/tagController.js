import * as tagService from '@services/tagService'

export function index(req, res) {
  const tags = tagService.getAll()

  res.json({ tags })
}

export function show(req, res) {
  const tag = tagService.findById(req.params.id)

  res.json({ tag })
}

export function store(req, res) {
  const tag = tagService.create(req.body)

  res.status(201).json({ tag })
}

export function destroy(req, res) {
  tagService.deleteById(req.params.id)

  res.status(204).json({})
}
