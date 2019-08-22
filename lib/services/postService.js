let auto_increment = 0

const posts = []

export function getAll() {
  return posts
}

export function findById(id) {
  return posts.find(u => u.id == id)
}

export function create(data) {
  const post = { ...data, id: ++auto_increment }

  posts.push(post)

  return post
}

export function deleteById(id) {
  const index = posts.findIndex(p => p.id == id)

  if (index != -1) {
    posts.splice(index, 1)

    return true
  }

  return false
}
