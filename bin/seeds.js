const mongoose = require('mongoose')
const faker = require('faker')
//models
const User = require('../models/User.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const Report = require('../models/Report.model')


require('../config/db.config')

const {groupTypes, genderType, dietTypes, occupation, phoneGenerator, randomDate, dniGenerator} = require("./data")

Promise.all([Professional.deleteMany(), Elder.deleteMany(), Report.deleteMany(), User.deleteMany()]).then(() => {

  for(let i = 0; i<occupation.length; i++){
    Professional.create({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phonenumber: phoneGenerator(),
      email: `${occupation[i]}@vitae.com`,
      password: '12345678',
      occupation: occupation[i]
    })
    .then(p => {
      for(let i = 0; i<10; i++){
        User.create({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          phonenumber: phoneGenerator(),
          address:faker.address.streetAddress(),
          email: faker.internet.email(),
          password: '12345678',
        })
        .then((u) => {
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
              Report.create({
                elder: e.id,
                title: faker.lorem.words(),
                description: faker.lorem.paragraphs(),
                professional:p.id
              })
              .then(r => {
                User.findByIdAndUpdate(u.id,{elder: e.id})
                .then(() => {
                  Elder.findByIdAndUpdate(e.id,{relative: u.id, reports: u.id })
                  .then(() => console.log(`Created ${e.firstname} con el familiar ${u.firstname}`))
                  .catch((e) => console.log(e));

                  Professional.findByIdAndUpdate(p.id,{reports: u.id })
                  .then()
                  .catch(e => next(e));

                })
                .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
            })
            
          .catch((e) => console.log(e));
        })
        .catch(e => console.log(e))
      }
    })
    .catch(e => console.log(e))
  }
});


