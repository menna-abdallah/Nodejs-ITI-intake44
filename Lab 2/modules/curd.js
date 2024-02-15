const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data.json');

const addEntry = (todolist,title) => {
    const id = todolist.length > 0 ? todolist[todolist.length - 1].id + 1 : 1;
    const entry = { id, title, status: "to-do" };
    todolist.push(entry);
    const jsonData = JSON.stringify(todolist);
    fs.writeFileSync(dataFilePath, jsonData);
    console.log(`added successfully`);
  };
  
  // edit 
  const editEntry = (todolist, id , newTitle)=>{
      const index = todolist.findIndex((entry) => entry.id === parseInt(id));
    
      if (index !== -1) {
        todolist[index].title = newTitle;
        saveData(todolist);
        console.log(`updated successfully.`);
      } else {
        console.log(`not found.`);
      }
    };
  
    // delete
  
    const deleteEntry = (todolist , id) => {
      
      const newlist = todolist.filter((entry) => entry.id !== parseInt(id)); // delete
  
      if (todolist.length !== newlist.length) {
        saveData(newlist);
        console.log(`deleted successfully.`);
      } else {
        console.log(`not found.`);
      }
    };

    module.exports = { addEntry, editEntry, deleteEntry };
