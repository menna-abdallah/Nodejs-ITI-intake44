const express = require('express');
const todosController = require('../controllers/todosControllers');

const todosrouter = require('./todorouters');

const router = express.Router();
router.get('', (req, res, next) => {
  const todos = todosController.getTodos();
  res.status(200).json(todos);
  next();
});

router.use('/todos', todosrouter);

module.exports = router;
