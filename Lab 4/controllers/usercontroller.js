const Users = require('../models/users');


// ------------------ creat ------------------------------ //

const createuser = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json({
      message: 'User created successfully',
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

// --------------------------- get all ------------------------------------------- //

const getAll = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

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

// ------------------------ delete --------------------------------- //

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({
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

// ------------------------ update --------------------------------- //

const updateUser = async (req, res, next) => {
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json({
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

module.exports = {
  createuser,
  getAll,
  getUserById,
  deleteUser,
  updateUser,
};
