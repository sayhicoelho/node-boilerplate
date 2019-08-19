const validator = require('../../../../validator')

const validate = (req, res, next) => {
  const rules = {
    name: 'required|string|max:100',
    email: 'required|email|max:100',
    password: 'required|string|min:6|max:60',
    passwordConfirmation: 'required|match:password',
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
