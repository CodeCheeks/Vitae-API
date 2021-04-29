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
  Professional.findById(req.params.id)
  .populate('organizedactivities')
  .populate('participants')
    .then(professional => professional != null && res.json(professional.organizedactivities))
    .catch(e => console.log(e))

  Elder.findById(req.params.id)
  .populate('therapies')
  .populate('organizer')
    .then(elder => elder != null && res.json(elder.therapies))
    .catch(e => console.log(e))
}


module.exports.getActivity = (req, res, next) => {
  Activity.findById(req.params.id)
  .then(activity => res.status(201).json(activity))
  .catch(e => console.log(e))
}


module.exports.editActivity = (req, res, next) => {

  Activity.findByIdAndUpdate(req.params.id,
    {
      title: req.body.duration,
      duration: req.body.duration,
      schedule:req.body.schedule
    })
    .then(act => {
      for(let i=0; i< req.body.participants.length; i++){
        Elder.findById(req.body.participants[i])
            .then(eld => { 
                eld.therapies.push(act.id)
                eld.save()
        
                Activity.findById(req.params.id)
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



module.exports.addParticipants = (req, res, next) => {
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

module.exports.deleteActivity = (req, res, next) => {
  Activity.findById(req.params.id)
  .then(act => {
    act.participants.forEach(part => {
      Elder.findById(part)
      .then(eld => {
        eld.therapies.splice(eld.therapies.indexOf(act.id),1)
        eld.save()
      })
      .catch(e => console.log(e))
    })
    Professional.findById(act.organizer)
    .then(prof => {
      prof.organizedactivities.splice(prof.organizedactivities.indexOf(act.id),1)
      prof.save()
    })
    .catch(e => console.log(e))
  })
  Activity.findByIdAndDelete(req.params.id)
    .then(a => {
      console.log("Activity deleted")
      
      res.status(201).json(a)
    })
    .catch(e => console.log(e))
  .catch()
}


module.exports.deleteParticipants = (req, res, next) => {
  Activity.findById(req.body.id)
  .then(act => {
      req.body.arr.forEach(elder => {
      act.participants.splice(act.participants.indexOf(elder),1)
    })
    act.save()
    for(let i=0; i< req.body.arr.length; i++){
      Elder.findById(req.body.arr[i])
        .then(eld => { 
          eld.therapies.splice(eld.therapies.indexOf(act.id),1)
          eld.save()    
        })
        .catch((e) => console.log(e))
      }  
    res.status(201).json(act) 
  })
.catch(e => console.log(e))
}

