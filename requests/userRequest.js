const validator = require('../validator')

const validate = (req, res, next) => {
  const rules = {
    name: 'required|string|max:100',
    email: 'required|email|max:100',
    password: 'required|string|min:6',
    passwordConfirmation: 'required|match:password',
  }

  validator
    .validate(req.body, rules)
    .then(next)
    .catch(errors => res.status(400).json(errors))
}

const prepareForValidation = (req, res, next) => {
  // const words = req.body.name.split(' ')

  // req.body.name = `${words[0]} ${words[1]}`

  // req.body.email = req.body.email.toLowerCase()

  next()
}

module.exports = {
  validate,
  prepareForValidation,
}
