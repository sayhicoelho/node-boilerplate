let auto_increment = 0

const roles = []

function getAll() {
  return roles
}

function findById(id) {
  return roles.find(u => u.id == id)
}

function create(data) {
  const role = { ...data, id: ++auto_increment }

  roles.push(role)

  return role
}

function deleteById(id) {
  const index = roles.findIndex(p => p.id == id)

  if (index != -1) {
    roles.splice(index, 1)

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
