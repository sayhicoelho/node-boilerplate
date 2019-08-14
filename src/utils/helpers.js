const replacer = (str, values, prefix = ':') => {
  for (let key in values) {
    const value = values[key]

    str = str.replace(`${prefix}${key}`, value)
  }

  return str
}

const isInteger = value => {
  return /^\d+$/.test(value)
}

const isEmail = str => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return pattern.test(str)
}

const isHost = str => {
  const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

  return pattern.test(str)
}

const isURL = str => {
  const pattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/

  return pattern.test(str)
}

module.exports = {
  replacer,
  isInteger,
  isEmail,
  isHost,
  isURL,
}
