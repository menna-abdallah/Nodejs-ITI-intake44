const mongoose = require('mongoose');
const bcrypt = require('bcrypt');




const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'user must have a user name'],
      unique: [true, 'user name is used before'],
      minlength: [8, 'user name min length is 8'],
    },
    firstName: {
      type: String,
      // required: [true, 'user must have a first name'],
      minlength: [3, 'first name min length is 3'],
      maxlength: [15, 'first name max length is 15'],
    },
    lastName: {
      type: String,
      // required: [true, 'user must have a last name'],
      minlength: [3, 'last name min length is 3'],
      maxlength: [15, 'last name max length is 15'],
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      minlength: [8, 'password min length is 8'],
    },
    email: {
      type: String,
      required: [true, 'user must have an email'],
      unique: [true, 'this email is used before'],
      validate: {
        validator(v) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    rol: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function preSave(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};
const Users = mongoose.model('Users', userSchema);

module.exports = Users;
