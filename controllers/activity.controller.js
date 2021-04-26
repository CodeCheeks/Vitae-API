const createError = require('http-errors')
const Report = require('../models/Report.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const mongoose = require("mongoose")
const Activity = require('../models/Activity.model')


/* module.exports.listReports = (req, res, next) => {
    console.log(req.query.id)
    //TODO use req.body
    Elder.findById(req.query.id)
    .populate('reports')
    .populate('professional')
      .then(elder => res.json(elder.reports))
      .catch(e => console.log(e))
} */
  
module.exports.addActivity = (req, res, next) => {
    const {title,schedule,duration,organizer} = req.body
    Professional.findById(req.currentUser)
    .then(prof => {
        return Activity.create(req.body)
            .then(act => { 
                prof.organizedactivities.push(act.id)
                prof.save()
                act.organizer = prof.id
                act.save()
                res.status(201).json(act)
                console.log(`The activity ${act.title} was created`)                          
            }
          )
    })
    .catch(e => console.log(e))
}

/* module.exports.editReport = (req, res, next) => {
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
    Report.findById(req.body.id)
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
  } */