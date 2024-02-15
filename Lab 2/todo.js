const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');
const { addEntry, editEntry, deleteEntry } = require('./modules/curd.js');
var todolist = [];

// check file existence using fs.accessSync() method
try {
  fs.accessSync(dataFilePath, fs.constants.F_OK);
} catch (err) {
  // Handle the error if the file doesn't exist
  if (err.code === 'ENOENT') {
    fs.writeFileSync(dataFilePath, '[]');
  } else {
    console.error('Error:', err.message);
  }
}

// Load data from the file
const loadData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Save data to the file
const saveData = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilePath, jsonData);
};

todolist = loadData();

// start

if (process.argv[2] === "list") {
  console.log(todolist.map(entry => `ID: ${entry.id} - Title: ${entry.title} - Status: ${entry.status}`).join('\n'));
}
else if (!(process.argv[3])) {
  console.log("Enter a valid process")
}
else {
  if (process.argv[2] === "add") {
    addEntry(todolist, process.argv[3])
  }
  else if (process.argv[2] === "edit") {
    editEntry(todolist, process.argv[3], process.argv[4])
  }
  else if (process.argv[2] === "delete") {
    deleteEntry(todolist, process.argv[3])
  }
  else {
    console.log("Enter a valid process")
  }
}

saveData(todolist);


var container = document.getElementById("container")

todolist.forEach(todo => {
  var li = document.createElement("li");
  li.innerHTML = todo.title;
  li.id = todo.id;
  container.appendChild(li);
  
}); 

