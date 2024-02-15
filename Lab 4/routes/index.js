const router = require('express').Router();

router.use('/todos', require('./todoroutes'));
router.use('/users', require('./uroutes'));

module.exports = router;
