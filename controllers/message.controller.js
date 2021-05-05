const Message = require("../models/Message.model")
const Professional = require("../models/Professional.model")
const User = require("../models/User.model")

module.exports.addMessage = (req, res, next) => {
    console.log(req.body)
    
    //--------Professional send to professional------------
    Professional.findById(req.params.receptor_id)
        .then( receptor => {
            if(receptor){
            Professional.findById(req.body.sender)
            .then( sender => {
                if(sender){
                    Object.assign(req.body, {
                        onModelReceiver: 'Professional',
                        onModelSender: 'Professional'
                    })
                    Message.create(req.body)
                        .then(mes => {
                            Professional.findById(mes.receiver)
                            .then(receiver => {
                                receiver.receivedmessages.push(mes._id)
                                receiver.save()
                                res.status(201).json(mes)
                            })
                            .catch(e => console.log(e))
                
                            Professional.findById(mes.sender)
                            .then(sender => {
                                sender.sentmessages.push(mes._id)
                                sender.save()
                            })
                            .catch(e => console.log(e))
                
                            })
                        .catch(e => console.log(e))
                }
            })
            .catch(e => next(e))
        }
    })
    .catch(e => next(e))

   //--------Professional send to user--------------- 
   User.findById(req.params.receptor_id)
    .then(receptor => {
        if(receptor){
            Object.assign(req.body, {
                onModelReceiver: 'User',
                onModelSender: 'Professional'
            })
            Message.create(req.body)
                .then(mes => {
                    User.findById(mes.receiver)
                    .then(receiver => {
                        receiver.receivedmessages.push(mes._id)
                        receiver.save()
                        res.status(201).json(mes)
                    })
                    .catch(e => console.log(e))
    
                    Professional.findById(mes.sender)
                    .then(sender => {
                        sender.sentmessages.push(mes._id)
                        sender.save()
                    })
                    .catch(e => console.log(e))
    
                    })
                .catch(e => console.log(e))
            }
        })
    .catch(e => next())

    //--------User send to professional--------------- 
    User.findById(req.body.sender)
    .then(response => {
         
        if(response){
            console.log('Usuario-profesional')
            Object.assign(req.body, {
                onModelReceiver: 'Professional',
                onModelSender: 'User'
            })
            Message.create(req.body)
                .then(mes => {
                    Professional.findById(mes.receiver)
                    .then(receiver => {
                        receiver.receivedmessages.push(mes._id)
                        receiver.save()
                        res.status(201).json(mes)
                        
                     
                    })
                    .catch(e => console.log(e))
    
                    User.findById(mes.sender)
                    .then(sender => {
                        sender.sentmessages.push(mes._id)
                        sender.save()
                        
                    })
                    .catch(e => console.log(e))
                    
                    })
                .catch(e => console.log(e))
                
        }
        
    })
    .catch(e => next())
  }

//PROFESSIONALS MESSAGES
module.exports.listReceivedMessages = (req, res, next) => {
Professional.findById(req.params.id)
.populate({
    path: 'receivedmessages',
    populate: {
      path: 'sender',
    }}
    ) 
    .then(professional => res.json(professional.receivedmessages))
    .catch(e => console.log(e))
}


module.exports.listSentMessages = (req, res, next) => {
Professional.findById(req.params.id)
.populate({
    path: 'sentmessages',
    populate: {
      path: 'receiver',
    }}
)
    .then(professional => res.json(professional.sentmessages))
    .catch(e => console.log(e))
}

//USER MESSAGES
module.exports.userListReceivedMessages = (req, res, next) => {
    User.findById(req.params.id)
    .populate({
        path: 'receivedmessages',
        populate: {
          path: 'sender',
        }}
        ) 
        .then(user => res.json(user.receivedmessages))
        .catch(e => console.log(e))
    }

module.exports.userListSentMessages = (req, res, next) => {
    User.findById(req.params.id)
    .populate({
        path: 'sentmessages',
        populate: {
          path: 'receiver',
        }}
    )
        .then(user => res.json(user.sentmessages))
        .catch(e => console.log(e))
    }



module.exports.deleteMessage = (req, res, next) => {
Message.findByIdAndDelete(req.params.id)
.then(mes => {
    Professional.findById(mes.receiver)
        .then(p => {
            if(p){
                p.receivedmessages.splice(p.receivedmessages.indexOf(mes.id),1)
                p.save() 
            }
            else{
            User.findById(mes.receiver)
                .then( u => {
                    u.receivedmessages.splice(u.receivedmessages.indexOf(mes.id),1)
                    u.save()  
                }
            )}
            Professional.findById(mes.sender)
            .then(s => {
                if(s){
                    s.sentmessages.splice(s.sentmessages.indexOf(mes.id),1)
                    s.save() 
                    res.status(201).json(mes)
                }else{
                    User.findById(mes.sender)
                        .then( us => {
                            us.sentmessages.splice(us.sentmessages.indexOf(mes.id),1)
                            us.save() 
                            res.status(201).json(mes) 
                        }

                    ) 
                }   
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
})
.catch(e => console.log(e))
}
    

