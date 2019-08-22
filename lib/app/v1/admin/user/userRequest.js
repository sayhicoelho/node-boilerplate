import * as validator from '@validator'

export function validate(req, res, next) {
  const rules = {
    name: 'required|string|max:100',
    email: 'required|email|max:100',
    password: 'required|string|min:6',
    passwordConfirmation: 'required|match:password',
  }

  validator
    .validate(req.body, rules, res.locals.lang)
    .then(next)
    .catch(errors => res.status(422).json(errors))
}

export function prepareForValidation(req, res, next) {
  next()
}
