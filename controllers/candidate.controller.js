const createError = require('http-errors')
const Candidate = require('../models/Candidate.model')




module.exports.listCandidates = (req, res, next) => {
  Candidate.find()
    .then(elders => res.json(elders))
    .catch(next)
}


 module.exports.addCandidate = (req, res, next) => {

  if (req.file) {
    req.body.cv = req.file.path;
  }
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

module.exports.delete = (req, res, next) => {
  Candidate.findByIdAndDelete(req.body.id)
    .then(cand => {
        res.status(201).json(cand)
        console.log(`${cand} has been deleted`)
    })
    .catch((e) => console.log(e))
}

