const postService = require('../../../../services/postService')

function index(req, res) {
  const posts = postService.getAll()

  res.json({ posts })
}

function show(req, res) {
  const post = postService.findById(req.params.id)

  res.json({ post })
}

function store(req, res) {
  const post = postService.create(req.body)

  res.status(201).json({ post })
}

function destroy(req, res) {
  postService.deleteById(req.params.id)

  res.status(204).json({})
}

module.exports = {
  index,
  show,
  store,
  destroy,
}
