let auto_increment = 0

const users = []

export function getAll() {
  return users
}

export function findById(id) {
  return users.find(u => u.id == id)
}

export function create(data) {
  const user = { ...data, id: ++auto_increment }

  users.push(user)

  return user
}

export function deleteById(id) {
  const index = users.findIndex(p => p.id == id)

  if (index != -1) {
    users.splice(index, 1)

    return true
  }

  return false
}
