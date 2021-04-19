const mongoose = require('mongoose')
const faker = require('faker')
const User = require('../models/User.model')
const Elder = require('../models/Elder.model')
require('../config/db.config')
const {groupTypes, genderType, dietTypes} = require("./data")
//Lo que queremos q haga cuando se abra la conexión de mongoose
Promise.all([Elder.deleteMany(), User.deleteMany()]).then(() => {
  for(let i = 0; i<50; i++){
    User.create({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phonenumber: faker.phone.phoneNumber(),
      address:faker.address.direction(),
      email: faker.internet.email(),
      password: '12345678',
    })
    .then((u) => {
        Elder.create({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          gender: genderType[Math.floor(Math.random() * genderType.length)],
          dateOfBirth: faker.datatype.datetime(),
          address: faker.address.streetAddress(),
          group: groupTypes[Math.floor(Math.random() * groupTypes.length)],
          diet: dietTypes[Math.floor(Math.random() * dietTypes.length)],
          user: u.id
        })
          .then((e) => {
            User.findByIdAndUpdate(u.id,{elder: e.id})
            .then(() => {
              console.log(`Created ${e.firstname} con el familiar ${u.firstname}`)
            })
        })
      .catch((e) => console.log(e));
    })
    .catch(e => console.log(e))
    }
});