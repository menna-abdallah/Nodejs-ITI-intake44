const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'todo must have a title'],
    minlength: [5,'title  min length is 5'],
    maxlength: [20,'title  max length is 20']
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true,'todo must have one user at most']
  },
  tags: [{
    type: String,
    maxlength: [10,'tag max length is 20']
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
