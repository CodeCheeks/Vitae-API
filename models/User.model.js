const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Firstname is required.'],
    },
    lastname: {
      type: String,
      required: [true, 'Lastname is required.'],
    },
    phonenumber: {
      type: String,
      required: [true, 'Phonenumber is required.']
    },
    address: {
      type: String,
      required: 'Address is required'
    },
    active: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: () => uuidv4()
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, 'Email invalid'],
      unique: true,
    },
    password: {
      type: String,
      //match: [PASSWORD_PATTERN, 'Your password must contain at least 1 number, 1 uppercase, 1 lowercase and 8 characters'],
      required: [true, 'Password is required.'],
    },
    elder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Elder",
  },
    sentmessages: [{type: Schema.Types.ObjectId, ref: 'Message' }],
    receivedmessages: [{type: Schema.Types.ObjectId, ref: 'Message' }]
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

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR)
      .then(hash => {
        this.password = hash
        next()
      })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};





const User = mongoose.model('User', userSchema)

module.exports = User