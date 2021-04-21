const createError = require('http-errors')
const Candidate = require('../models/Candidate.model')




module.exports.listCandidates = (req, res, next) => {
  Candidate.find()
    .then(elders => res.json(elders))
    .catch(next)
}


 module.exports.addCandidate = (req, res, next) => {
   Candidate.findOne({ email: req.body.email })
    .then(info => {
      if (info) {
        next(createError(400, { errors: { email: 'This email is already in use' } }))
      } else {
        return Candidate.create(req.body)
          .then(info => res.status(201).json(info))
      }
    })
    .catch(e => console.log(e))
} 

