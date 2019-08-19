const tagService = require('../../../../services/tagService')

const index = (req, res) => {
  const tags = tagService.getAll()

  res.json({ tags })
}

const show = (req, res) => {
  const tag = tagService.findById(req.params.id)

  res.json({ tag })
}

const store = (req, res) => {
  const tag = tagService.create(req.body)

  res.status(201).json({ tag })
}

const destroy = (req, res) => {
  tagService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
