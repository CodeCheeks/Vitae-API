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
    dni: {
      type: String,
        required: [true, 'DNI is required.'],
    },
    gender: {
      type: String,
      enum: ['Varón','Mujer'],
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
      enum: ["Verde", "Naranja", "Rojo"],
    },
    diet: {
       type: String,
       enum: ["Basal", "Diabético", "Sin gluten","Bajo en sal"],
       default: 'Basal'
    },
    relative: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    therapies: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],

    reports: [{type: Schema.Types.ObjectId, ref: 'Report' }],

    pictures: [String],
    
    profilepicture: {
      type: String,
      default: 'https://res.cloudinary.com/dv7hswrot/image/upload/v1619428231/Vitae/avatares/avataaars_4_dblx23.png'
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




const Elder = mongoose.model('Elder', elderSchema)

module.exports = Elder