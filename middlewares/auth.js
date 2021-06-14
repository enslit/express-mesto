const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../utils/httpErrors/UnauthorizedError');

module.exports = function auth(req, res, next) {
  try {
    const { jwt } = req.cookies;

    if (!jwt) {
      throw new UnauthorizedError('Не авторизован');
    }

    jsonwebtoken.verify(jwt, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError(err.message);
      }

      req.user = decoded._id;
    });

    return next();
  } catch (e) {
    return next(e);
  }
};
