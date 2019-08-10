const replacer = (str, values, prefix = ':') => {
  for (let key in values) {
    const value = values[key]

    str = str.replace(`${prefix}${key}`, value)
  }

  return str
}

module.exports = {
  replacer,
}
