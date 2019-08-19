const categoryService = require('../../../../services/categoryService')

const index = (req, res) => {
  const categories = categoryService.getAll()

  res.json({ categories })
}

const show = (req, res) => {
  const category = categoryService.findById(req.params.id)

  res.json({ category })
}

const store = (req, res) => {
  const category = categoryService.create(req.body)

  res.status(201).json({ category })
}

const destroy = (req, res) => {
  categoryService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
