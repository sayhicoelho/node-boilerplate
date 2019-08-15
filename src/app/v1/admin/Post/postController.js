const postService = require('../../../../services/postService')

const index = (req, res) => {
  const posts = postService.getAll()

  res.json({ posts })
}

const show = (req, res) => {
  const post = postService.findById(req.params.id)

  res.json({ post })
}

const store = (req, res) => {
  const post = postService.create(req.body)

  res.status(201).json({ post })
}

const destroy = (req, res) => {
  postService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
