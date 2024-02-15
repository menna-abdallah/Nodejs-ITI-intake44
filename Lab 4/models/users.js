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
      required: [true, 'user must have a first name'],
      minlength: [3, 'first name min length is 3'],
      maxlength: [15, 'first name max length is 15'],
    },
    lastName: {
      type: String,
      required: [true, 'user must have a last name'],
      minlength: [3, 'last name min length is 3'],
      maxlength: [15, 'last name max length is 15'],
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: [true, 'password is requird'],
      minlength: [8, 'password min length is 8'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    },
  },
);

userSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};
const Users = mongoose.model('Users', userSchema);

module.exports = Users;
