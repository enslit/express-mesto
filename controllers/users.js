const User = require('../models/user');
const { createError } = require('../utils/utils');

module.exports.getUsers = (req, res, next) =>
  User.find({})
    .then((users) => res.json(users))
    .catch(next);

module.exports.getUser = (req, res, next) =>
  User.findById(req.params.id)
    .exec()
    .then((user) => {
      if (user) {
        return res.json(user);
      }

      return next(
        createError(404, `Пользователь с ID: ${req.params.id} не найден`)
      );
    })
    .catch(next);

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  if (name && about && avatar) {
    return User.create({ name, about, avatar })
      .then((user) => res.status(201).json(user))
      .catch(next);
  }

  return next(createError(400, 'не передано поле name about или avatar'));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  if (name && about) {
    return User.findByIdAndUpdate(req.user._id, { name, about })
      .then((updatedUser) => res.json(updatedUser))
      .catch(next);
  }

  return next(400, 'не передано поле name или about');
};

module.exports.updateAvatar = (req, res, next) =>
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);
