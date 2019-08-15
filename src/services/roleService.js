let auto_increment = 0

const roles = []

const getAll = () => roles

const findById = id => roles.find(u => u.id == id)

const create = data => {
  const role = { ...data, id: ++auto_increment }

  roles.push(role)

  return role
}

const deleteById = id => {
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
