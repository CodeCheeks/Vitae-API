const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const activitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.']
    },
    schedule: {
      type: String,
      required: true,
      default: '12:00'
    },
    duration: {
      type: Number,
      required: false,
      default: 45
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

elderSchema.virtual('reports', {
	ref: 'Report',
	localField: '_id',
	foreignField: 'elder'
});

elderSchema.virtual('activities', {
	ref: 'Activity',
	localField: '_id',
	foreignField: 'elder'
});


const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity