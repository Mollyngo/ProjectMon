const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
// const clinicController = require('../controllers/clinic-controller');
const authenticate = require('../middlewares/authMiddleware');

// router.get('/:id', UserController.getUser);
router.patch('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);
router.get('/user', authenticate, UserController.getAllUsers);

// router.get('/clinic', clinicController.getAllClinic);








module.exports = router;
