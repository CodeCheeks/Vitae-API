const mongoose = require('mongoose')
const faker = require('faker')
//models
const User = require('../models/User.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const Report = require('../models/Report.model')

require('../config/db.config')

const {elderAvatarMale, elderAvatarFemale, } = require("./data")
Professional.find()
.then(professionals => {
  professionals.forEach(prof => {
    Report.find({ professional: prof._id })
    .then(reports => {
      prof.reports = reports

      if(prof.occupation === "director"){
        prof.admin = true 
      } 
      if(prof.occupation === "coordinator"){
        prof.admin = true 
      } 

      prof.save()
    })
    .catch(error => console.log("---------- Error finding reports ----------"))
  })
})
.catch(error => console.log("---------- Error finding professionals ----------"))


Elder.find()
.then(elders => {
  elders.forEach(e => {
    Report.find({ elder: e._id })
    .then(reports => {
      e.reports = reports
      if(e.gender === "Varón"){
        e.profilepicture = elderAvatarMale[Math.floor(Math.random() * elderAvatarMale.length)]
      }
      else{
        e.profilepicture = elderAvatarFemale[Math.floor(Math.random() * elderAvatarFemale.length)]
      }

      e.age = new Date().getFullYear()-(e.dateOfBirth.getFullYear())
      e.save()
    })
    .catch(error => console.log("---------- Error finding reports ----------"))
  })
})
.catch(error => console.log("---------- Error finding elders ----------"))




