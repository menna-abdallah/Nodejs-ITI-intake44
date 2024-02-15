const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const CustomError = require('../lib/errorClass');

const { JWT_SECRET = 'test' } = process.env;

const createuser = async (user) => {
  const newUser = await Users.create(user).catch((err) => {
    throw new CustomError(err.message, 422);
  });

  return newUser;
};


const login = async ({ email, password }) => {
  const user = await Users.findOne({ email }).exec();
  const valid = await user.verifyPassword(password);
  if (!valid) {
    throw new CustomError('this password or email is not valid', 401);
  }
  const token = jwt.sign({ email, id: user.id }, JWT_SECRET, { expiresIn: '3d' });
  return {
    user,
    token,
  };
};


const getAll = () => Users.find({});


const deleteUser = async (id) => {
  const deletedUser = await Users.findByIdAndDelete(id).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deletedUser;
};


const updateUser = async (id, input) => {
  const updatedUser = await Users.findByIdAndUpdate(
    id,
    input,
    { new: true, runValidators: true },
  ).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return updatedUser;
};

module.exports = {
  createuser,
  login,
  getAll,
  deleteUser,
  updateUser,
  // getUserById,
};
