const mongoose = require('mongoose')

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const candidateSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Firstname is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Lastname is required.'],
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: 'Add a phone number'
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, 'Email invalid'],
        unique: true,
    },
    vacancy: {
      type: String,
      required: [true, 'Vacancy is required.']
    },
    street: {
      type: String,
      required: [true, 'Street is required.']
    },
    city: {
      type: String,
      required: [true, 'City is required.']
    },
    zip: {
      type: String,
      required: [true, 'zipcode is required.']
    },
    comments: {
      type: String
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
)

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate