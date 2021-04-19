const mongoose = require('mongoose')

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
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
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


const Elder = mongoose.model('Elder', elderSchema)

module.exports = Elder