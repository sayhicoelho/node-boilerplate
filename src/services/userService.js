let auto_increment = 0

const users = []

const getAll = () => users

const findById = id => users.find(u => u.id == id)

const create = data => {
  const user = { ...data, id: ++auto_increment }

  users.push(user)

  return user
}

const deleteById = id => {
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
