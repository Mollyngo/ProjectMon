const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authMiddleware');

// router.get('/:id', UserController.getUser);
router.patch('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);
router.get('/user', authenticate, UserController.getAllUsers);









module.exports = router;
