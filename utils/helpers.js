const bcrypt = require('bcryptjs')
const config = require('../config')

const replacer = (str, values, prefix = ':') => {
  for (let key in values) {
    const value = values[key]
    const pattern = new RegExp(`${prefix}${key}`, 'g')

    str = str.replace(pattern, value)
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

const hash = async str => {
  return await bcrypt.hash(str, config.auth.bcryptSalt)
}

const strFormat = format => {
  var args = Array.prototype.slice.call(arguments, 1)

  return format.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match
  })
}

const filename = str => {
  const splitted = str.split('.')
  const length = splitted.length

  if (length == 1) {
    return {
      name: str,
      ext: null,
    }
  }

  const ext = splitted[length - 1]
  splitted.splice(-1)

  return {
    name: splitted.join('.'),
    ext,
  }
}

const slugify = str => {
  str = str || ''
  const a =
    'àáäãâèéëêìíïîòóöõôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ'
  const b =
    'aaaaaeeeeiiiiooooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/ου/g, 'ou')
    .replace(/ευ/g, 'eu')
    .replace(/θ/g, 'th')
    .replace(/ψ/g, 'ps')
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

module.exports = {
  replacer,
  isInteger,
  isEmail,
  isHost,
  isURL,
  hash,
  strFormat,
  filename,
  slugify,
}
