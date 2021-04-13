const mongoose = require('mongoose')
const faker = require('faker')

const User = require('../models/User.model')

require('../config/db.config')

//Lo que queremos q haga cuando se abra la conexión de mongoose
mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  //Para borrar la base de datos antes de empezar
  mongoose.connection.db.dropDatabase()
    .then(() => console.log('Database clear'))
    .then(() => {
      //Genero los usuarios y los meto en un array
      const users = []

      for (let index = 0; index < 10; index++) {
        users.push({
          email: faker.internet.email(),
          password: '12345678',
          name: faker.name.findName(),
          address: faker.address.streetName(),
        })
      }
      //Creo los usuarios con el modelo
      return User.create(users)
    })
    .then(users => {
      console.log(`${users.length} users created`)

    })
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .finally(() => process.exit(0))
})
