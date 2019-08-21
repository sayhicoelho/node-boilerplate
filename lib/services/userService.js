let auto_increment = 0

const users = []

function getAll() {
  return users
}

function findById(id) {
  return users.find(u => u.id == id)
}

function create(data) {
  const user = { ...data, id: ++auto_increment }

  users.push(user)

  return user
}

function deleteById(id) {
  const index = users.findIndex(p => p.id == id)

  if (index != -1) {
    users.splice(index, 1)

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
