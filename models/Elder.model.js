const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const elderSchema = mongoose.Schema(
  {
    firstname: {
        type: String,
        required: [true, 'Firstname is required.'],
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required.'],
    },
    gender: {
      type: String,
      enum: ['male','female'],
      required: 'Lastname is required'
    },
    dateOfBirth: {
        type: Date,
        required: 'Lastname is required'  
    },
    address: {
      type: String,
      required: 'Address is required'
    },
    group: {
      type: String,
      enum: ['green','orange','red'],
    },
    diet: {
       type: String,
       enum: ['basal','diabetic','glutenfree','lowsalt'],
       default: 'basal'
    },
    relative: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    therapies: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],

    reports: [{type: Schema.Types.ObjectId, ref: 'Report' }]
    
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




const Elder = mongoose.model('Elder', elderSchema)

module.exports = Elder