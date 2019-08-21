const validator = require('@validator')

function validate(req, res, next) {
  const rules = {
    name: 'required|string|max:50',
    email: 'required|email|max:50',
    password: 'required|string|min:6|max:60',
    passwordConfirmation: 'required|match:password',
  }

  validator
    .validate(req.body, rules, res.locals.lang)
    .then(next)
    .catch(errors => res.status(422).json(errors))
}

function prepareForValidation(req, res, next) {
  return next()
}

module.exports = {
  validate,
  prepareForValidation,
}
