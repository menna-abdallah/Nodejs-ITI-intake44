const express = require('express');
const UsersController = require('../controllers/usercontroller');
const TodosController = require('../controllers/todocontroller');
const asyncWrapper = require('../lib/async-wrapper');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.createuser(req.body));
  if (!err) {
    res.status(201).json(user);
  }
  return next(err);
});

router.post('/login', async (req, res, next) => {
  const { body: { email, password } } = req;
  const [err, result] = await asyncWrapper(UsersController.login({ email, password }));
  if (!err) {
    return res.json({ result });
  }
  return next(err);
});

router.get('/',auth, async (req, res, next) => {
  const [err, users] = await asyncWrapper(UsersController.getAll());
  if (!err) {
    res.status(200).json(users);
  }
  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this user' });
    }

    const [err, deletedUser] = await asyncWrapper(UsersController.deleteUser(req.params.id));

    if (!err) {
      return res.status(200).json(deletedUser);
    }
    return next(err);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.patch('/:id',auth, async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ error: 'You are not authorized to update this user' });
    }

    const [err, updatedUser] = 
    await asyncWrapper(UsersController.updateUser(req.params.id, req.body));

    if (!err) {
      return res.status(200).json(updatedUser);
    }
    return next(err);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:id/todos', TodosController.findbyUserId);


module.exports = router;
