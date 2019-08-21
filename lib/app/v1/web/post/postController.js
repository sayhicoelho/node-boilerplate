const postService = require('../../../../services/postService')

function index(req, res) {
  // TODO: Implement pagination
  const posts = postService.getAll()

  res.json({ posts })
}

function show(req, res) {
  const post = postService.findById(req.params.id)

  res.json({ post })
}

module.exports = {
  index,
  show,
}
