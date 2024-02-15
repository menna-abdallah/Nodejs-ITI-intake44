/* eslint-disable radix */
const Todos = require('../models/todos');
const CustomError = require('../lib/errorClass');

// ------------------------ GET --------------------------------- //

const filterTodo = async (req, res) => {
  if (!req.query.length) {
    try {
      let {
        // eslint-disable-next-line prefer-const
        limit = 10, skip = 0, status, createdAt, updatedAt, tags,
      } = req.query;
      status = status || 'todo';

      // Query the database
      while(limit <= 50){
        let query = Todos.find({ status });
        if (createdAt) query = query.where('createdAt').equals(new Date(createdAt));
        if (updatedAt) query = query.where('updatedAt').equals(new Date(updatedAt));
        if (tags) query = query.where('tags').in(tags.split(',')); // Assuming tags are comma-separated
  
        const todos = await query.select('_id userId title status tags createdAt updatedAt')
          .limit(parseInt(limit))
          .skip(parseInt(skip));
        if (!todos.length) return res.status(500).json({ wornning: 'please check your query' });
  
        return res.status(200).json({ todos });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
    } else {
      const todos = await Todos.find({});
      res.json(todos);
    }
      }
};

const createtodo = async (todo) => {
  const newTodo = await Todos.create(todo)
    .catch((err) => {
      throw new CustomError(err.message, 422);
    });
  return newTodo;
};

const deletetodo = async (id) => {
  const todo = await Todos.findByIdAndDelete(id).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return todo;
};

const updatetodo = async (id, body, userID) => {
  const todo = await Todos.findOneAndUpdate(
    { _id: id, userId: userID },
    body,
    { new: true },
  ).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return todo;
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
