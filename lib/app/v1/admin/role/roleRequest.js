import * as validator from '@validator'

export function validate(req, res, next) {
  const rules = {
    name: 'required|string|max:100',
    slug: 'required|slug|max:100',
  }

  validator
    .validate(req.body, rules, res.locals.lang)
    .then(next)
    .catch(errors => res.status(422).json(errors))
}

export function prepareForValidation(req, res, next) {
  next()
}
