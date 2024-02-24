const express = require('express');

const authController = require('../controllers/auth-controller');
const UserController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authenticate, UserController.getUser);

module.exports = router;
