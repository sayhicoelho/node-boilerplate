import { db } from '@database'

export function query(sql, values = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

export function getDefault(options) {
  if ('default' in options) {
    return `DEFAULT ${options.default}`
  }

  return ''
}

export function getOnUpdate(options) {
  if ('onUpdate' in options) {
    return `ON UPDATE ${options.onUpdate}`
  }

  return ''
}

export function getOnDelete(options) {
  if ('onDelete' in options) {
    return `ON DELETE ${options.onDelete}`
  }

  return ''
}

export function getUnsigned(options) {
  if ('unsigned' in options) {
    return options.unsigned ? 'UNSIGNED' : ''
  }

  return ''
}

export function getZerofill(options) {
  if ('zeroFill' in options) {
    return options.zeroFill ? 'ZEROFILL' : ''
  }

  return ''
}

export function getAutoIncrement(options) {
  if ('autoIncrement' in options) {
    return options.autoIncrement ? 'AUTO_INCREMENT' : ''
  }

  return ''
}

export function getNotNull(options) {
  if ('nullable' in options) {
    const optionDefault = options.default || 'NULL'

    return options.nullable ? `NULL DEFAULT ${optionDefault}` : 'NOT NULL'
  }

  return 'NOT NULL'
}

export function getUnique(options) {
  if ('unique' in options) {
    return options.unique ? `UNIQUE` : ''
  }

  return ''
}

export function getForeign(table, column, options) {
  if ('foreign' in options) {
    const [refTable, refColumn] = options.foreign.ref
    const indexName =
      options.foreign.key || `fk_${table}_${column}_${refTable}_${refColumn}`

    return `INDEX ${indexName} (${column}),
      CONSTRAINT ${indexName} FOREIGN KEY (${column}) REFERENCES ${refTable} (${refColumn}) ${getOnUpdate(
      options.foreign
    )} ${getOnDelete(options.foreign)}`
  }

  return ''
}

export function getRawOptions(name, options) {
  return `${name} ${options.type} ${getUnsigned(options)} ${getZerofill(
    options
  )} ${getAutoIncrement(options)} ${getNotNull(options)} ${getDefault(
    options
  )} ${getOnUpdate(options)} ${getUnique(options)}`
}

export function setTimestamps(columns) {
  columns.createdAt = {
    type: 'TIMESTAMP',
    default: 'CURRENT_TIMESTAMP',
  }

  columns.updatedAt = {
    type: 'TIMESTAMP',
    default: 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }
}
