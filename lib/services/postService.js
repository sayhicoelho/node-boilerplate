let auto_increment = 0

const posts = []

function getAll() {
  return posts
}

function findById(id) {
  return posts.find(u => u.id == id)
}

function create(data) {
  const post = { ...data, id: ++auto_increment }

  posts.push(post)

  return post
}

function deleteById(id) {
  const index = posts.findIndex(p => p.id == id)

  if (index != -1) {
    posts.splice(index, 1)

    return true
  }

  return false
}

module.exports = {
  getAll,
  findById,
  create,
  deleteById,
}
