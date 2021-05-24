module.exports = function auth(req, res, next) {
  req.user = {
    // _id: '60a9687ae006774b800fbfa2',
    _id: '60a96895e006774b800fbfa3',
  };

  next();
};
