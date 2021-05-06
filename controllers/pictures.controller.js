const Elder = require("../models/Elder.model")


module.exports.getPictures = (req, res, next) => {
    Elder.findById(req.params.id)
    .then(elder => {
        res.status(201).json(elder.pictures)
    })
    .catch(e => console.log(e))
  }