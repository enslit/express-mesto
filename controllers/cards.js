const Cards = require('../models/card');
const { createError } = require('../utils/utils');

module.exports.getCards = (req, res, next) =>
  Cards.find({})
    .then((cards) => res.json(cards))
    .catch(next);

module.exports.deleteCard = (req, res, next) =>
  Cards.findByIdAndDelete(req.params.cardId)
    .exec()
    .then((card) => {
      if (card) {
        return res.json(card);
      }

      return next(
        createError(404, `Карточка с ID: ${req.params.cardId} не найдена`)
      );
    })
    .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (name && link) {
    return Cards.create({ name, link, owner: req.user })
      .then((card) => res.status(201).json(card))
      .catch(next);
  }

  return next(createError(404, 'не передано поле name или link'));
};

module.exports.likeCard = (req, res, next) =>
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.json(card);
      }

      return next(
        createError(404, `Карточка с ID: ${req.params.cardId} не найдена`)
      );
    })
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.json(card);
      }

      return next(
        createError(404, `Карточка с ID: ${req.params.cardId} не найдена`)
      );
    })
    .catch(next);
