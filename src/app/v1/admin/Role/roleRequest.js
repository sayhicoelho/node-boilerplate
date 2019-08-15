const validator = require('../../../../validator')

const validate = (req, res, next) => {
  const rules = {
    name: 'required|string|max:100',
    slug: 'required|slug|max:100',
  }

  validator
    .validate(req.body, rules)
    .then(next)
    .catch(errors => res.status(422).json(errors))
}

const prepareForValidation = (req, res, next) => next()

module.exports = {
  validate,
  prepareForValidation,
}
