const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const CustomError = require('../lib/errorClass');


const { JWT_SECRET = 'test' } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = jwt.verify(authorization, JWT_SECRET);
    const user = await Users.findById(token.id).exec();
    if (!user) {
      throw new CustomError('UNAUTHORIZED', 402);
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = auth;
