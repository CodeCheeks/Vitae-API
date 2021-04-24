const createError = require('http-errors')
const Report = require('../models/Report.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const mongoose = require("mongoose")

module.exports.create = (req, res, next) => {


    Elder.findOne({ _id: req.body.elder })
    .then(elder => {
        return Report.create(req.body)
            .then(report => { 
                elder.reports.push(report.id)
                elder.save()
                Professional.findOne({ _id: req.body.professional })
                .then(prof => {
                    prof.reports.push(report.id)
                    prof.save()
                    res.status(201).json(report)
                })                           
            }
          )
    })
    .catch(e => console.log(e))


}