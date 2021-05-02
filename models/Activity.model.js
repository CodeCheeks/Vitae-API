const { date } = require('faker');
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    startHour: {
      type: String,
      required: true,
    },
    finishHour: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date
    },
    sector: {
      type: String,
      required: false,
    },
    organizer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Professional",
    },
    participants: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'Elder' 
      }
    ]
    
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



const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity