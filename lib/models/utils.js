function safeColumns(fillable, hidden) {
  return fillable.filter(field => !hidden.includes(field))
}

module.exports = {
  safeColumns,
}
