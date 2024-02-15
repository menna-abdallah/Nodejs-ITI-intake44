const express = require('express');
const TodosController = require('../controllers/todocontroller');

const router = express.Router();

const auth = require ('../middlewares/auth')

// ------------------------- POST /todos -----------------
/*
// private rout // middleware // verfy jwt
router.use(auth)
router.post('/', async (req, res, next) => {
  const { body: { title } } = req;
  const todo =await TodosController.createtodo({ title, userId: req.user._id });
  res.json(todo);
});
*/
// ------------------------- DELETE /todos/:id -----------------

router.delete('/:id', TodosController.deletetodo);

// ------------------------- Patch/todos/:id -----------------

router.patch('/:id', TodosController.updatetodo);

// -------------------------- get /todos?limit=10&skip=0&status=$value --------------

router.get('/', TodosController.filterTodo);
// ------------------------- Export -----------------
module.exports = router;
