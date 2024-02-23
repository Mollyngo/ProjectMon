const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.get('/:id', UserController.getAllUser);









module.exports = router;
