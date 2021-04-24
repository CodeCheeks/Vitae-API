const createError = require('http-errors')
const Elder = require('../models/Elder.model')
const User = require('../models/User.model')

const jwt = require('jsonwebtoken')

module.exports.list = (req, res, next) => {
  Elder.find()
  .populate('relative')
    .then(elders => res.json(elders))
    .catch(next)
}

//CREATE ELDER AND RELATIVE
module.exports.addElder = (req, res, next) => {
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
          diet: req.body.diet
        })
        .then(e => {
          console.log(e)
          User.create({
            email: req.body.email,
            password: "12345678",
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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
  Elder.findByIdAndUpdate(req.body.id,
  {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    gender: req.body.gender,
    dni: req.body.dni,
    dateOfBirth: req.body.birth,
    group: req.body.group,
    diet: req.body.diet
  })
  .then((e) => {
    res.status(201).json(e)
    console.log('Updated') 
    }  
  )
  .catch((e) => {console.log(e)})
}

//DELETE ELDER



module.exports.deleteElder = (req, res, next) => {
  Elder.findByIdAndDelete(req.body.id)
  .then((e) => {
    User.findByIdAndDelete(e.relative)
    .then((r) => {
      console.log('Elder and relative deleted')
      }
    ) 
  })
  .catch((e) => {console.log(e)})
}

/* {
  "email": "piedrapómez@gmail.com",
  "password": "12345678",
  "firstname": "Sisuka",
  "lastname": "Quinta Cornelia",
  "address": "Calle Maravillas 21",
  "elderfirstname": "Eugenio",
  "elderlastname": "Cabalgatore di Florenza",
  "elderaddress": "Calle Piongoa",
  "gender": "Varón",
  "dni":"560as9W",
  "birth":"1939-07-28T04:25:49.791+00:00",
  "group": "Verde",
  "diet": "Basal"
}
 */

