const createError = require('http-errors')
const Report = require('../models/Report.model')
const Elder = require('../models/Elder.model')
const Professional = require('../models/Professional.model')
const mongoose = require("mongoose")
const Activity = require('../models/Activity.model')


 module.exports.listAllActivities = (req, res, next) => {
    Activity.find()
    .populate('elders')
    .populate('professionals')
      .then(act => res.json(act))
      .catch(e => console.log(e))
} 

module.exports.listActivities = (req, res, next) => {
  
  //TODO use req.body

  Professional.findById(req.query.id)
  .populate('organizedactivities')
  .populate('participants')
    .then(professional => professional != null && res.json(professional.organizedactivities))
    .catch(e => console.log(e))

  Elder.findById(req.query.id)
  .populate('therapies')
  .populate('organizer')
    .then(elder => elder != null && res.json(elder.therapies))
    .catch(e => console.log(e))
}

module.exports.addElders = (req, res, next) => {
  //Expects a body with the activity id and an array with elder ids
  Activity.findById(req.body.id)
  .then(act => {
    for(let i=0; i< req.body.arr.length; i++){
      Elder.findById(req.body.arr[i])
          .then(eld => { 
              eld.therapies.push(act.id)
              eld.save()
      
              Activity.findById(act.id)
              .then((a) => {
                a.participants.push(eld.id)
                a.save()
              })
              .catch((e) => console.log(e))
                                    
          }
        )
        .catch((e) => console.log(e))
    }  
    res.status(201).json(act) 
    
  })
  
  .catch(e => console.log(e))
}

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


//TOFIX
module.exports.deleteElders = (req, res, next) => {
  //Expects a body with the activity id and an array with elder ids
  Activity.findById(req.body.id)
  .then(act => {
    for(let i=0; i< req.body.arr.length; i++){
      Elder.findById(req.body.arr[i])
        .then(eld => { 
          console.log(act.participants)
          eld.therapies.splice(eld.therapies.indexOf(act.id),1)
          eld.save()
          
         Activity.findById(act.id)
          .then((a) => {
            a.participants.splice(a.participants.indexOf(eld.id),1)
            a.save()
          })
          .catch((e) => console.log(e))                      
        })
        .catch((e) => console.log(e))
    }  
    res.status(201).json(act) 
    
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