const createError = require('http-errors')
const User = require('../models/User.model')

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next(createError(400, { errors: { email: 'This email is already in use' } }))
      } else {
        // User creation
        return User.create(req.body)
          .then(user => res.status(201).json(user))
      }
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'))
      } else {
        res.json(user)
      }
    })
    .catch(next)
}

