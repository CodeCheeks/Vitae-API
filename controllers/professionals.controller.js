const createError = require('http-errors')
const Professional = require('../models/Professional.model')

const jwt = require('jsonwebtoken')

 module.exports.create = (req, res, next) => {
    Professional.findOne({ email: req.body.email })
    .then(prof => {
      if (prof) {
        next(createError(400, { errors: { email: 'This email is already in use' } }))
      } else {
        // prof creation
        return prof.create(req.body)
          .then(prof => res.status(201).json(prof))
      }
    })
    .catch(next)
} 

module.exports.list = (req, res, next) => {
  Professional.find()
    .then(professionals => res.json(professionals))
    .catch(next)
}

module.exports.get = (req, res, next) => {
  Professional.findById(req.currentUser)
    .then(prof => {
      if (!prof) {
        next(createError(404))
      } else {
        res.json(prof)
      }
    })
}



module.exports.authenticate = (req, res, next) => {
  const { email, password } = req.body

  Professional.findOne({ email })
    .then(prof => {
      if (!prof) {
        // Error if no user
        next(createError(404, { errors: { email: 'Email or password is incorrect' }}))
      } else {
        return prof.checkPassword(password)
          .then(match => {
            if (!match) {
              //Error if no password
              next(createError(404, { errors: { email: 'Email or password is incorrect' }}))
            } else {
              // JWT generation - only id is passed
              res.json({ 
                access_token: jwt.sign(
                  { id: prof._id },
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