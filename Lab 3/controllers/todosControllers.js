const TodosModel = require('../models/todolist');

// ------------ get all logic----------------
const getTodos = () => {
  const todos = TodosModel.getTodos();
  return todos;
};

// ---------------get byID logic-------------------

const getTodoByID = (id) => {
  const todos = TodosModel.getTodos();
  const todo = todos.find((todo) => todo.id == parseInt(id));
  return todo;
};

// ------------------post logic----------------

const createTodo = (title) => {
  const todos = TodosModel.getTodos();
  // check if there is deleted , title is not empty
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const newTodo = { id, title, status: 'to-do' };
  todos.push(newTodo);
  TodosModel.saveTodos(todos);
};

// -------------------  patch logic -----------------------

const updateTodo = (id, title, status) => {
  const todos = TodosModel.getTodos();

  // check if the id is exist
  const newtodo = todos.find((todo) => todo.id == id);
  if (!newtodo) {
    return;
  }
  newtodo.title = title;
  newtodo.status = status;
  TodosModel.saveTodos(todos);
};

// ----------------- delete logic -------------------

const deleteTodo = (id) => {
  const todos = TodosModel.getTodos();
  const newlist = todos.filter((entry) => entry.id !== id); // delete
  if (todos.length === newlist.length) {
    return;
  }
  TodosModel.saveTodos(newlist);
  return true;
};

module.exports = {
  getTodos,
  getTodoByID,
  createTodo,
  updateTodo,
  deleteTodo,
};
