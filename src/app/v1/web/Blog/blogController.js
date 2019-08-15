const postService = require('../../../../services/postService')

const index = (req, res) => {
  const posts = postService.getAll()

  res.json({ posts })
}

const show = (req, res) => {
  const post = postService.findById(req.params.id)

  res.json({ post })
}

module.exports = {
  index,
  show,
}
