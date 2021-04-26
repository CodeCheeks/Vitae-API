const createError = require('http-errors')
const User = require('../models/User.model')
const Elder = require('../models/Elder.model')
const jwt = require('jsonwebtoken')

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
  User.findById(req.currentUser)
  .populate("elder")
  .populate('reports')
    .then(user => {
      if (!user) {
        next(createError(404))
      } else {
        res.json(user)
      }
    })
}

//The user is deleted in elder controller when the elder is deleted. 

//AUTH

module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) {
        // Error if no user
        next(createError(404, { errors: { email: 'Email or password is incorrect' }}))
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              //Error if no password
              next(createError(404, { errors: { email: 'Email or password is incorrect' }}))
            } else {
              // JWT generation - only id is passed
              res.json({ 
                access_token: jwt.sign(
                  { id: user._id },
                  process.env.JWT_SECRET || 'changeme',
                  {
                    expiresIn: '1h'
                  }
                )
               })
            }
          })
      }
    })
    .catch(error => next(error))
}