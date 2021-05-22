const User = require('../models/user');

module.exports = {
  getUsers(req, res) {
    return User.find({})
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json({ error }));
  },

  getUser(req, res) {
    const { id } = req.params;

    if (id) {
      return User.findById(id)
        .exec()
        .then((user) => res.json(user))
        .catch((error) => res.status(500).json({ error }));
    }

    return res.status(400).json({ message: 'Не передан id пользователя' });
  },

  createUser(req, res) {
    const { name, about, avatar } = req.body;

    if (name && about && avatar) {
      return User.create({ name, about, avatar })
        .then((user) => res.status(201).json(user))
        .catch((error) => res.status(500).json({ error }));
    }

    return res
      .status(400)
      .json({ message: 'не передано поле name about или avatar' });
  },
};
