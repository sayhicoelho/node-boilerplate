import * as postService from '@services/postService'

export function index(req, res) {
  const posts = postService.getAll()

  res.json({ posts })
}

export function show(req, res) {
  const post = postService.findById(req.params.id)

  res.json({ post })
}

export function store(req, res) {
  const post = postService.create(req.body)

  res.status(201).json({ post })
}

export function destroy(req, res) {
  postService.deleteById(req.params.id)

  res.status(204).json({})
}
