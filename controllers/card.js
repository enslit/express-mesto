const Card = require('../models/card');

module.exports = {
  getCards(req, res) {
    return Card.find({})
      .then((cards) => res.json(cards))
      .catch((error) => res.status(500).json({ error }));
  },

  deleteCard(req, res) {
    const { id } = req.params;

    if (id) {
      return Card.findByIdAndDelete(id)
        .exec()
        .then((card) => res.json(card))
        .catch((error) => res.status(500).json({ error }));
    }

    return res.status(400).json({ message: 'Не передан id карточки' });
  },

  createCard(req, res) {
    const { name, link } = req.body;
    const { _id: owner } = req.user;
    console.log(owner);

    if (name && link) {
      return Card.create({ name, link, owner })
        .then((card) => res.status(201).json(card))
        .catch((error) => res.status(500).json({ error }));
    }

    return res.status(400).json({ message: 'не передано поле name или link' });
  },
};
