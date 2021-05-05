const createError = require('http-errors')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')


module.exports.getToken = (req, res, next) => {
  User.findOne({ token:req.params.token })
  .then(user => {
    res.json({ 
      access_token: jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'changeme',
        {
          expiresIn: '5m'
        }
      )
     })
  })
  .catch()
};

module.exports.activate = (req, res, next) => {
  console.log(req.params.token)
  console.log(req.body)
  User.findOne({token: req.params.token})
    .then((u) => {
      u.active = true
      u.password = req.body.password
      u.save()
      res.status(201).json(u)
    })
    .catch((e) => next(e));
};




