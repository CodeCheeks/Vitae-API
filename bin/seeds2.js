const mongoose = require('mongoose')
const faker = require('faker')
//models
const User = require('../models/User.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const Report = require('../models/Report.model')

require('../config/db.config')


Professional.find()
.then(professionals => {
  professionals.forEach(prof => {
    Report.find({ professional: prof._id })
    .then(reports => {
      prof.reports = reports
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
      e.save()
    })
    .catch(error => console.log("---------- Error finding reports ----------"))
  })
})
.catch(error => console.log("---------- Error finding elders ----------"))




