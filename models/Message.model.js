const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    message: {
      type: String,
      required: true,

    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      refPath: 'onModelSender'
    },
    receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        refPath: 'onModelReceiver'
    },
    onModelSender: {
      type: String,
      required: true,
      enum: ['User', 'Professional']
    },
    onModelReceiver: {
      type: String,
      required: true,
      enum: ['User', 'Professional']
    }

    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  }
);



const Message = mongoose.model('Message', messageSchema)

module.exports = Message