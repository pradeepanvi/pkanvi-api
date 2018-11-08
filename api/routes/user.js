const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');
const UserAddressCon = require('../controllers/users-address');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth, UserController.user_delete);

router.get('/address', checkAuth, UserAddressCon.user_address);

router.post('/address', checkAuth, UserAddressCon.user_create_address);

router.patch('/address/:addressId', checkAuth, UserAddressCon.user_update_address);

router.delete('/address/:addressId', checkAuth, UserAddressCon.user_update_address);

module.exports = router;