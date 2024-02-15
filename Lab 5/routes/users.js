const express = require('express');
const UsersController = require('../controllers/usercontroller');
// const TodosController = require('../controllers/todocontroller');
const asyncWrapper = require('../lib/async-wrapper');
const auth = require('../middlewares/auth');

const router = express.Router();

// ------------------------- POST /users -----------------

router.post('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createuser(req.body));
  if (!err) {
    res.status(201).json(user);
  }
  return next(err);
});

// ------------- login ----------------------

router.post('/login', async (req, res, next) => {
  const { body: { email, password } } = req;
  const [err, result] = await asyncWrapper(UsersController.login({ email, password }));
  if (!err) {
    return res.json({ result });
  }
  return next(err);
});

// ------------------------- GET /users -----------------

router.get('/', async (req, res, next) => {
  const [err, users] = await asyncWrapper(UsersController.getAll());
  if (!err) {
    res.status(200).json(users);
  }
  return next(err);
});

router.use(auth);

// ------------------------- DELETE /users/:id -----------------
router.delete('/:id', UsersController.deleteUser);

/*
// ------------------------- GET /users/:id -----------------

router.get('/:id', UsersController.getUserById);



// ------------------------- Patch/users/:id -----------------

router.patch('/:id', UsersController.updateUser);

// ------------------------- GET /users/:userId/todos'-----------------

router.get('/:id/todos', TodosController.findbyUserId);

// ------------------------- Export -----------------
*/
module.exports = router;
