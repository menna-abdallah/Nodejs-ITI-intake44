const express = require('express');
const TodosController = require('../controllers/todocontroller');

const router = express.Router();

// ------------------------- POST /todos -----------------

router.post('/', TodosController.createtodo);

// ------------------------- DELETE /todos/:id -----------------

router.delete('/:id', TodosController.deletetodo);

// ------------------------- Patch/todos/:id -----------------

router.patch('/:id', TodosController.updatetodo);

// -------------------------- get /todos?limit=10&skip=0&status=$value -------------- 

router.get('/', TodosController.filterTodo);
// ------------------------- Export -----------------
module.exports = router;

