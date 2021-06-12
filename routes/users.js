const { getUserProfile } = require('../controllers/users');
const router = require('express').Router();

const {
  getUsers,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
