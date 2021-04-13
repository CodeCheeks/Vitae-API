const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const SALT_WORK_FACTOR = 10;

const userSchema = mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: 'Email is required',
      match: [EMAIL_PATTERN, 'Email is not valid']
    },
    password: {
      type: String,
      required: 'Password is required',
      minLength: [8, 'Password must have 8 characters or more']
      //TODO match password pattern
    },
    name: {
      type: String,
      required: 'Name is required'
    },
    address: {
      type: String,
      required: 'Address is required'
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