const validator = require('@validator')

function validate(req, res, next) {
  const rules = {
    title: 'required|string|max:100',
    slug: 'required|slug|max:100',
    excerpt: 'required|string|max:100',
    body: 'required|string',
    cover: 'required|image',
  }

  validator
    .validate(req.body, rules, res.locals.lang)
    .then(next)
    .catch(errors => res.status(422).json(errors))
}

function prepareForValidation(req, res, next) {
  next()
}

module.exports = {
  validate,
  prepareForValidation,
}
