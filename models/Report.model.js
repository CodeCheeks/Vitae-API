const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    description: {
      type: String,
      required: [true, 'Description is required.']
    },
    read: {
      type: Boolean,
      default: false
    },
    Professional: {
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


const Report = mongoose.model('Report', reportSchema)

module.exports = Report