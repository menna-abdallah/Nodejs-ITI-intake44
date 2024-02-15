const express = require('express');

const todosController = require('../controllers/todosControllers');
const middlewarechecks = require('../validations/todosmiddlewares');

const router = express.Router();

// ---------------get all--------------------
router.get('/', (req, res) => {
  if (!req.query.status) {
    const todos = todosController.getTodos();
    res.status(200).render('index', { list: todos });
  } else {
    // filer acoording to status
    const { status } = req.query;
    let todos = todosController.getTodos();
    todos = todos.filter((el) => el.status === status);
    if (todos !== '') {
      res.status(200).render('index', { list: todos });
    } else {
      res.status(400).render('errors', { message: ' Invalid Status' });
    }
  }
});

// -----------------get by id---------------------

router.get('/:id', middlewarechecks.getById, (req, res) => {
  const todo = todosController.getTodoByID(req.params.id);
  if (todo) {
    res.status(200).render('index', { list: [todo] });
  } else {
    res.status(404).render('errors', { message: 'Todo not found' });
  }
});

// ------------ creat --------------
router.post('/', middlewarechecks.add, (req, res, next) => {
  const { title } = req.body;
  const todo = todosController.createTodo(title);
    res.sendStatus(204).json([{ message: 'Added successfully' }]);

  next();
});

// ----------------- patch -----------------

router.patch('/:id', middlewarechecks.edit, (req, res, next) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const todo = todosController.updateTodo(id, title.trim(), status);
  if (todo) {
    res.sendStatus(204).json([{ message: 'updated successfully' }]);
  } else {
    res.status(404).render('errors', { message: 'Todo not found' });
  }
  next();
});

// delete by id

router.delete('/:id', middlewarechecks.deleteById, (req, res, next) => {
  const { id } = req.params;
  const todo = todosController.deleteTodo(id);
  if (todo) {
    res.sendStatus(204).json([{ message: 'updated successfully' }]);
  } else {
    res.status(404).render('errors', { message: 'Todo not found' });
  }
  next();
});

module.exports = router;
