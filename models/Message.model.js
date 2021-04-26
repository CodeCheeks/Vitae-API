const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    description: {
      type: String,
      required: true,
      default: '12:00'
    },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Professional",
    },
    receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Professional",
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