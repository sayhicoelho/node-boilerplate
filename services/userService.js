let auto_increment = 0

const users = []

const getUsers = () => users

const getUser = id => users.find(u => u.id == id)

const createUser = data => {
  const user = { ...data, id: ++auto_increment }

  users.push(user)

  return user
}

module.exports = {
  getUsers,
  getUser,
  createUser,
}
