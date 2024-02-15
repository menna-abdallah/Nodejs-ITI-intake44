const express = require('express');
const UsersController = require('../controllers/usercontroller');
const TodosController = require('../controllers/todocontroller');


const router = express.Router();

// ------------------------- POST /users -----------------

router.post('/', UsersController.createuser);

// ------------------------- GET /users -----------------

router.get('/', UsersController.getAll);

// ------------------------- GET /users/:id -----------------

router.get('/:id', UsersController.getUserById);

// ------------------------- DELETE /users/:id -----------------

router.delete('/:id', UsersController.deleteUser);

// ------------------------- Patch/users/:id -----------------

router.patch('/:id', UsersController.updateUser);

// ------------------------- GET /users/:userId/todos'-----------------

router.get('/:id/todos', TodosController.findbyUserId);


// ------------------------- Export -----------------
module.exports = router;
