const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const { JWT_SECRET = 'test' } = process.env;

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// ------------------ creat ------------------------------ //
const createuser = async (user) => {
  const newUser = await Users.create(user).catch((err) => {
    throw new CustomError(err.message, 422);
  });

  return newUser;
};

// --------------- login -------------------------//

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

// --------------------------- get all ------------------------------------------- //

const getAll = () => Users.find({});

// ------------------------ delete --------------------------------- //

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: 'User deleted successfully',
      user,
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};


/*
// ------------------------ find by id --------------------------------- //

const getUserById = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    // const user = await Users.findOne({_id: req.params.id});
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};


// ------------------------ update --------------------------------- //

const updateUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(201).json({
      message: 'User updated successfully',
      user,
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};
*/
module.exports = {
  createuser,
  login,
  getAll,
  deleteUser,
 // getUserById,
 // updateUser,
};
