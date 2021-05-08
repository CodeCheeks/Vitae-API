const createError = require('http-errors')
const Elder = require('../models/Elder.model')
const User = require('../models/User.model')
const Report = require('../models/Report.model')

const jwt = require('jsonwebtoken')
const Professional = require('../models/Professional.model')
const { newUserVitae } = require('../config/mailer.config')
const Message = require('../models/Message.model')

module.exports.list = (req, res, next) => {
  Elder.find()
  .populate('relative')
    .then(elders => res.json(elders))
    .catch(next)
}

module.exports.getElder = (req, res, next) => {
  Elder.findById(req.params.id)
  .populate('relative')
  .populate({
      path: 'therapies',
      populate: {
        path: 'organizer',
      }})
    .then(elder => res.json(elder))
    .catch(next)
}

module.exports.getElderByName = (req, res, next) => {
  Elder.findOne({firstname: req.params.name})
    .then(elder => res.json(elder))
    .catch(next)
}

//CREATE ELDER AND RELATIVE
module.exports.addElder = (req, res, next) => {
  console.log(req.body)
  Elder.findOne({ dni: req.body.dni })
    .then(elder => {
      if(elder){
        next(createError(400, { errors: { dni: 'This dni is already in use' } }))
      }
      else {
        Elder.create({
          firstname: req.body.elderfirstname,
          lastname: req.body.elderlastname,
          address: req.body.elderaddress,
          gender: req.body.gender,
          dni: req.body.dni,
          dateOfBirth: req.body.birth,
          group: req.body.group,
          diet: req.body.diet,
          age: req.body.age
        })
        .then(e => {
          console.log(e)
          User.create({
            email: req.body.email,
            password: "12345678",
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phonenumber: req.body.phoneNumber,
            address: req.body.address,
            elder: e.id
          })
          .then(u => {
            newUserVitae(u.email, u.token)
            Elder.findByIdAndUpdate(u.elder, {relative: u.id})
            .then(info => res.status(201).json(info))
          })
          .catch(e => next(e))
        })
        .catch(e => next(e))
      }
    })
    .catch(next)
}
  
////EDIT ELDER 

module.exports.editElder = (req, res, next) => {
  Elder.findByIdAndUpdate(req.params.id,
  {
    firstname: req.body.elderfirstname,
    lastname: req.body.elderlastname,
    address: req.body.elderaddress,
    gender: req.body.gender,
    dni: req.body.dni,
    dateOfBirth: req.body.birth,
    group: req.body.group,
    diet: req.body.diet,
    age: req.body.age
  })
  .then((e) => {
    User.findByIdAndUpdate(e.relative, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      email: req.body.email,
    })
      .then((u) => {
        res.status(201).json(u)
        console.log('Updated')
      })
      .catch((e) => console.log(e))
     
  })
  .catch((e) => {console.log(e)})
}

module.exports.uploadElderImage = (req, res, next) => {
  if (req.file) {
    req.body.picture = req.file.path;
  }

  Elder.findById(req.params.id)
  .then(elder => {
    elder.pictures.push(req.file.path)
    elder.save()
    res.status(201).json(elder.pictures[elder.pictures.length-1 ])
  })
  .catch(e => next(e))
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

//DELETE ELDER



module.exports.deleteElder = (req, res, next) => {
  Elder.findByIdAndDelete(req.query.id)
  .then((e) => {
    User.findByIdAndDelete(e.relative)
    .then(u => {
      Message.deleteMany({ receiver: u._id })
      .then(m => console.log('received messages deleted'))
      .catch(e => console.log(e))
      Message.deleteMany({ sender: u._id })
      .then(m => console.log('sent messages deleted'))
      .catch(e => console.log(e))
      res.status(201).json(e)
      }
    ) 
    Report.deleteMany({ elder: e._id })
    .then(r => {
      console.log('Reports deleted')
    })
    Professional.find()
    .then(professionals => {
      professionals.forEach(prof => {
        Report.find({ professional: prof._id })
        .then(reports => {
          prof.reports = reports
          prof.save()
        })
        .catch(e => console.log(e))
      })
    })
    .catch(e => console.log(e))

  })
  .catch((e) => console.log(e))
}



