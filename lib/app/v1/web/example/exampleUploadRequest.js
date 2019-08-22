import * as validator from '@validator'

export function validate(req, res, next) {
  const rules = {
    avatar: 'required',
  }

  const data = {
    avatar: req.file,
  }

  validator
    .validate(data, rules, res.locals.lang)
    .then(next)
    .catch(errors => res.status(422).json(errors))
}
