const validator = require('../../../../validator')

const validate = (req, res, next) => {
  const rules = {
    body: 'required|string|max:1000',
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
