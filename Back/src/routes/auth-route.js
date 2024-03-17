const express = require('express');

const authController = require('../controllers/auth-controller');
const UserController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authMiddleware');
const { validateLogin } = require('../validators/authValidator');
const { validateRegister } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/user', authenticate, UserController.getUser);

module.exports = router;
