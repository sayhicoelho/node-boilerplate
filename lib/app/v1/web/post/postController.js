import postService from '@services/postService'

export function index(req, res) {
  // TODO: Implement pagination
  const posts = postService.getAll()

  res.json({ posts })
}

export function show(req, res) {
  const post = postService.findById(req.params.id)

  res.json({ post })
}
