const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

module.exports.getUserProfile = (req, res, next) =>
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        return next(createError(400, 'Пользователь не найден'));
      }

      return res.json(user);
    })
    .catch(next);

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name, about, avatar } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return next(
        createError(400, 'Пользователь с таким email уже зарегистрирован')
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: passwordHash,
      name,
      about,
      avatar,
    });

    return res.status(201).json(user);
  } catch (e) {
    return next(e);
  }
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) =>
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((updatedUser) => res.json(updatedUser))
    .catch(next);

module.exports.login = (req, res, next) =>
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      return res.end();
    })
    .catch(next);
