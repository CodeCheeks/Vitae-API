const Message = require("../models/Message.model")
const Professional = require("../models/Professional.model")

module.exports.addMessage = (req, res, next) => {
    Message.create(req.body)
    .then(mes => {
        Professional.findById(mes.receiver)
        .then(receiver => {
            receiver.receivedmessages.push(mes._id)
            receiver.save()
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

module.exports.deleteMessage = (req, res, next) => {
Message.findByIdAndDelete(req.params.id)
.then(mes => {
    Professional.findById(mes.receiver)
    .then(p => {
        p.receivedmessages.splice(p.receivedmessages.indexOf(mes.id),1)
        p.save() 
        Professional.findById(mes.sender)
        .then(p => {    
            p.sentmessages.splice(p.sentmessages.indexOf(mes.id),1)
            p.save() 
            res.status(201).json(mes)
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
})
.catch(e => console.log(e))
}
    

