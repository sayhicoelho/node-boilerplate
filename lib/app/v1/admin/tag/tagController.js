const tagService = require('@services/tagService')

function index(req, res) {
  const tags = tagService.getAll()

  res.json({ tags })
}

function show(req, res) {
  const tag = tagService.findById(req.params.id)

  res.json({ tag })
}

function store(req, res) {
  const tag = tagService.create(req.body)

  res.status(201).json({ tag })
}

function destroy(req, res) {
  tagService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
