const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema, model } = require('mongoose');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const SALT_WORK_FACTOR = 10;

const professionalSchema = mongoose.Schema(
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
      trim: true,
      default: 'Add a phone number'
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        lowercase: true,
        trim: true,
        //match: [EMAIL_PATTERN, 'Email invalid'],
        unique: true,
    },
    password: {
      type: String,
      //match: [PASSWORD_PATTERN, 'Your password must contain at least 1 number, 1 uppercase, 1 lowercase and 8 characters'],
      required: [true, 'Password is required.'],
    },
    occupation: {
        type: String,
        enum: ['nurse','physiotherapist','doctor','director','coordinator','psychologist','occupational therapist','social worker','animator'],
    },
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
)



professionalSchema.virtual('activities', {
	ref: 'Activity',
	localField: '_id',
	foreignField: 'professional'
});

professionalSchema.virtual('users', {
	ref: 'User',
	localField: '_id',
	foreignField: 'professional'
});


professionalSchema.pre('save', function(next) {
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

professionalSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};


const Professional = mongoose.model('Professional', professionalSchema)

module.exports = Professional