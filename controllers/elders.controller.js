const createError = require('http-errors')
const Elder = require('../models/Elder.model')
const User = require('../models/User.model')
const Report = require('../models/Report.model')

const jwt = require('jsonwebtoken')
const Professional = require('../models/Professional.model')

module.exports.list = (req, res, next) => {
  Elder.find()
  .populate('relative')
    .then(elders => res.json(elders))
    .catch(next)
}

module.exports.getElder = (req, res, next) => {
  Elder.findById(req.params.id)
  .populate({
      path: 'therapies',
      populate: {
        path: 'organizer',
      }}) 
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
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            elder: e.id
          })
          .then(u => {
            Elder.findByIdAndUpdate(u.elder, {relative: u.id})
            .then(info => res.status(201).json(info))
          })
          .catch()
        })
        .catch()
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
    diet: req.body.diet
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
        
        console.log('Updated')
      })
      .catch((e) => console.log(e))
     
  })
  .catch((e) => {console.log(e)})
}

//DELETE ELDER



module.exports.deleteElder = (req, res, next) => {
  Elder.findByIdAndDelete(req.query.id)
  .then((e) => {
    User.findByIdAndDelete(e.relative)
    .then((u) => {
      console.log('Elder and relative deleted')
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
        .catch(error => console.log(e))
      })
    })
    .catch(error => console.log(e))

  })
  .catch((e) => console.log(e))
}



