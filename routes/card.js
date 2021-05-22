const router = require('express').Router();
const { getCards, deleteCard, createCard } = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

module.exports = router;
