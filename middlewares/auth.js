const jsonwebtoken = require('jsonwebtoken');
const { createError } = require('../utils/utils');

module.exports = function auth(req, res, next) {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(createError(401, 'Не авторизован'));
  }

  jsonwebtoken.verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError(401, err.message));
    }

    req.user = decoded._id;
  });

  return next();
};
