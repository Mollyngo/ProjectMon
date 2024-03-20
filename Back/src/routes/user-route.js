const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authMiddleware');


router.patch('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);
router.get('/', authenticate, UserController.getAllUsers);










module.exports = router;
