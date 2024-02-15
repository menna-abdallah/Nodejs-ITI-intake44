const express = require('express');
const TodosController = require('../controllers/todocontroller');
const asyncWrapper = require ('../lib/async-wrapper')

const router = express.Router();

const auth = require('../middlewares/auth');


router.use(auth);

router.post('/', async (req, res, next) => {
  req.body.userId = req.user;
  const [err, todo] = await asyncWrapper(TodosController.createtodo(req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  const [err, todo] = 
  await asyncWrapper(TodosController.updateTodo(req.params.id, req.body, req.user));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});


router.delete('/:id', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.deletetodo(req.params.id));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

/*

// -------------------------- get /todos?limit=10&skip=0&status=$value --------------

router.get('/', TodosController.filterTodo);
// ------------------------- Export -----------------
*/
module.exports = router;
