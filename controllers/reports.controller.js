const createError = require('http-errors')
const Report = require('../models/Report.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const mongoose = require("mongoose")




module.exports.getReport = (req, res, next) => {
  console.log(req.params.id)
  Report.findById(req.params.id)
  .then(report => res.status(201).json(report))
  .catch(e => console.log(e))
}

module.exports.listReports = (req, res, next) => {
  
    //TODO use req.body

    Professional.findById(req.query.id)
    .populate('reports')
    .populate('professional')
      .then(professional => professional != null && res.json(professional.reports))
      .catch(e => console.log(e))

    Elder.findById(req.query.id)
    .populate('reports')
    .populate('professional')
      .then(elder => elder != null && res.json(elder.reports))
      .catch(e => console.log(e))
}
  
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

module.exports.editReport = (req, res, next) => {
    Report.findByIdAndUpdate(req.body.id,
    {
      title: req.body.title,
      description: req.body.description,
      read: false
    })
    .then((r) => {
      res.status(201).json(r)
      console.log(`Report number ${r.id} Updated`) 
      }  
    )
    .catch((e) => {console.log(e)})
  }

  module.exports.deleteReport = (req, res, next) => {

    //TODO use req.body
    
    Report.findById(req.query.id)
      .then(r => {
        
        Professional.findById(r.professional)
            .then((p) => {
                p.reports.splice(p.reports.indexOf(r.id),1)
                p.save() 
                
            })
            .catch((e) => console.log(e))

        Elder.findById(r.elder)
            .then((e) => {
                e.reports.splice(e.reports.indexOf(e.id),1)
                e.save() 
                
            })
            .catch((e) => console.log(e))
        
        Report.findByIdAndDelete(r.id)
            .then((r) => {
                
            }) 
            .catch((e) => console.log(e))
            res.status(201).json(r)
            console.log('Report deleted')
      })
      .catch((e) => console.log(e))
  }