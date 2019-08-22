let auto_increment = 0

const roles = []

export function getAll() {
  return roles
}

export function findById(id) {
  return roles.find(u => u.id == id)
}

export function create(data) {
  const role = { ...data, id: ++auto_increment }

  roles.push(role)

  return role
}

export function deleteById(id) {
  const index = roles.findIndex(p => p.id == id)

  if (index != -1) {
    roles.splice(index, 1)

    return true
  }

  return false
}
