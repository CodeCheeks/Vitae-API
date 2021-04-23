const createError = require('http-errors')
const Elder = require('../models/Elder.model')

const jwt = require('jsonwebtoken')

 /* module.exports.create = (req, res, next) => {
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
}  */

module.exports.list = (req, res, next) => {
  Elder.find()
  .populate('relative')
    .then(elders => res.json(elders))
    .catch(next)
}

 /* module.exports.get = (req, res, next) => {
    Elder.findById(req.currentUser)
    .then(prof => {
      if (!prof) {
        next(createError(404))
      } else {
        res.json(prof)
      }
    })
}  */


