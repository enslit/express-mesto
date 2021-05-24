const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
