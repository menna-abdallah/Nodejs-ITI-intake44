const fs = require('fs');

const path = require('path');

const dataFilePath = path.join(__dirname, '../todolist.json');

// read data
const getTodos = () => {
  const todolist = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(todolist);
};

// write data
const saveTodos = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath, jsonData);
};

module.exports = { getTodos, saveTodos };
