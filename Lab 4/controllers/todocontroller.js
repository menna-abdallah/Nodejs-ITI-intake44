/* eslint-disable radix */
const Todos = require('../models/todos');

// ------------------------ GET --------------------------------- //

const filterTodo = async (req, res) => {
  try {
    let {
      // eslint-disable-next-line prefer-const
      limit = 10, skip = 0, orderBy, status, createdAt, updatedAt, tags,
    } = req.query;
      // status = status || 'todo';

    // Query the database
    let query = Todos.find({});
    if (orderBy) query = query.sort(orderBy);
    if (status) query = query.where('status').equals(status);
    if (createdAt) query = query.where('createdAt').equals(new Date(createdAt));
    if (updatedAt) query = query.where('updatedAt').equals(new Date(updatedAt));
    if (tags) query = query.where('tags').in(tags.split(',')); // Assuming tags are comma-separated

    const todos = await query
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    if (!todos.length) return res.status(500).json({ wornning: 'please check your query' });

    return res.status(200).json({ todos });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
;

// ------------------ creat ------------------------------ //

const createtodo = async (req, res, next) => {
  try {
    const todo = await Todos.create(req.body);
    res.status(200).json({
      message: 'Todos created successfully',
      todo,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};
// ------------------------ delete --------------------------------- //

const deletetodo = async (req, res, next) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'todo deleted successfully',
      todo,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// ------------------------ update --------------------------------- //

const updatetodo = async (req, res, next) => {
  try {
    const todo = await Todos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(200).json({
      message: 'todo updated successfully',
      todo,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// ------------------------ findbyUserId --------------------------------- //

const findbyUserId = async (req, res, next) => {
  try {
    const todos = await Todos.find({ userId: req.params.id });
    res.status(200).json({
      todos,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// ------------------------ exports --------------------------------- //

module.exports = {
  createtodo,
  deletetodo,
  updatetodo,
  findbyUserId,
  filterTodo,
};
