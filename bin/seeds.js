const mongoose = require('mongoose')
const faker = require('faker')

const User = require('../models/User.model')
const Elder = require('../models/Elder.model')

require('../config/db.config')

const {groupTypes} = require("./data")
const {dietTypes} = require("./data")


//Lo que queremos q haga cuando se abra la conexión de mongoose
mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  //Para borrar la base de datos antes de empezar
  mongoose.connection.db.dropDatabase()


    .then(() => {
      for(let i = 0; i<10; i++){
        console.log("creando usuario")
        User.create({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          phonenumber: faker.phone.phoneNumber(),
          address:faker.address.direction(),
          email: faker.internet.email(),
          password: '12345678',
        })
        .then((u) => {
          console.log("creando elder")
            Elder.create({
              firstname: faker.name.firstName(),
              lastname: faker.name.lastName(),
              gender: faker.name.gender() ,
              dateOfBirth: faker.adress.datetime(),
              address: faker.address.streetAddress(),
              group: dietTypes[Math.floor(Math.random() * dietTypes.length)],
              diet: groupTypes[Math.floor(Math.random() * groupTypes.length)],
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
      }
    })
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .finally(() => process.exit(0))
})

