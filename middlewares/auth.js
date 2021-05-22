module.exports = function auth(req, res, next) {
  req.user = {
    _id: '60a9687ae006774b800fbfa2',
  };

  next();
};
