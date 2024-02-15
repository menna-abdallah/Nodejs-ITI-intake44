const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = jwt.verify(authorization, JWT_SECRET);
    const user = await Users.findById(token.id).exec();
    if (!user) {
      return next('This user is not authorized');
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = auth;
