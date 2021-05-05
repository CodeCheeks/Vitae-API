const mongoose = require('mongoose')
const faker = require('faker')
//models
const User = require('../models/User.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const Report = require('../models/Report.model')
const Activity = require('../models/Activity.model')
const Message = require('../models/Message.model')


require('../config/db.config')

const {groupTypes, genderType, dietTypes, occupation, phoneGenerator, randomDate, dniGenerator, elderPictures} = require("./data")

Promise.all([Professional.deleteMany(), Elder.deleteMany(), Report.deleteMany(), Message.deleteMany(), Activity.deleteMany(), User.deleteMany()])
.then(() => {
  for(let i = 0; i<occupation.length; i++){
    Professional.create({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phonenumber: phoneGenerator(),
      email: `${occupation[i]}@vitae.com`,
      password: '12345678',
      occupation: occupation[i]
    })
    .then(p => console.log(`${p.occupation} added /n`))
    .catch(error => console.log("Error creating professionals"))
  }

  for(let i = 0; i<50; i++){
    User.create({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phonenumber: phoneGenerator(),
      address:faker.address.streetAddress(),
      email: faker.internet.email(),
      password: '12345678',
      active: true
    })
    .then(u => {
      console.log(`User ${u.firstname} ${u.lastname} added`)
      Elder.create({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        dni: dniGenerator(),
        gender: genderType[Math.floor(Math.random() * genderType.length)],
        dateOfBirth: randomDate(new Date(1920, 0, 1), new Date(1950, 0, 1)),
        address: faker.address.streetAddress(),
        group: groupTypes[Math.floor(Math.random() * groupTypes.length)],
        diet: dietTypes[Math.floor(Math.random() * dietTypes.length)],
        user: u.id
      })
      .then((e) => {
        console.log(`Elder ${e.firstname} ${e.lastname} added`)
        Professional.find()
        .then(professionals => {
          console.log("Professionals found")
          professionals.forEach(prof => {
            Report.create({
              elder: e.id,
              title: faker.lorem.words(),
              description: faker.lorem.paragraphs(),
              professional:prof.id
            })
            .then(r => {console.log(`Report added`)})
            .catch(error => console.log("---------- Error creating reports ----------"))
            //TODO CREATE ACTIVITY
            User.findByIdAndUpdate(u.id,{elder: e.id})
              .then(() => {
                console.log("User and elder successfully connected")
                Elder.findByIdAndUpdate(e.id,{relative: u.id})
                .then(() => console.log("Elder-user successfully connected"))
                .catch(error => console.log("---------- Error connection elder-user ----------"));
              })
              .catch(error => console.log("---------- Error connection user-elder ----------"))
          })
        })
        .catch(error => console.log("---------- Error finding professionals ----------"))
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log("---------- Error creating users ----------"))
  }
})
.catch(error => console.log("---------- Error deleting data ----------"))

 


