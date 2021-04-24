const createError = require('http-errors')
const Report = require('../models/Report.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const mongoose = require("mongoose")



module.exports.listReports = (req, res, next) => {
    console.log(req.body.id)
    Elder.findById(req.body.id)
    .populate('reports')
      .then(elder => res.json(elder.reports))
      .catch(e => console.log(e))
}//TODO IGNORA EL PRIMER ELEMENTO DEL ARRAY DE REPORTS. SI HAY SOLAMENTE 1 REPORT, DIRECTAMENTE NI LO MUESTRA.
  
module.exports.addReport = (req, res, next) => {
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