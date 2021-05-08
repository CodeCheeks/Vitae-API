const createError = require('http-errors')
const Professional = require('../models/Professional.model')

const jwt = require('jsonwebtoken')


 module.exports.create = (req, res, next) => {
    Professional.findOne({ email: req.body.email })
    .then(prof => {
      if (prof) {
        next(createError(400, { errors: { email: 'This email is already in use' } }))
      } else {
        
        return Professional.create(req.body)
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

module.exports.listOne = (req, res, next) => {
  Professional.findById(req.params.id)
    .then(prof => {
      if (!prof) {
        next(createError(404))
      } else {
        res.json(prof)
      }
    })
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
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  Professional.findByIdAndUpdate(req.params.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    occupation:req.body.occupation,
    admin: req.body.admin
  })
    .then(prof => {
      if (!prof) {
        next(createError(404))
      } else {
        res.status(201).json(prof)
        console.log('Updated')
      }
    })
    .catch((e) => console.log(e))
}

module.exports.delete = (req, res, next) => {
  Professional.findByIdAndUpdate(req.query.id,{active: false})
    .then(prof => {
        res.status(201).json(prof)
        console.log(`${prof} has been deleted`)
    })
    .catch((e) => console.log(e))
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


