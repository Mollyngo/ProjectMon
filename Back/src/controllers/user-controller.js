const userService = require('../services/user-service');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');

exports.getAllUsers = catchError(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
})

exports.getUser = catchError(async (req, res) => {
    res.status(200).json({ user: req.user });
})

// exports.createUser = catchError(async (req, res) => {
//     const user = await userService.createUser(req.body);
//     res.status(201).json(user);
// })


exports.deleteUser = catchError(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(user);
})

exports.updateUser = catchError(async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, mobile, email, password, role }
        = req.body;
    const userData = await userService.updateUser({ id, first_name, last_name, email, mobile, password, role });
    console.log(userData)
    res.status(200).json(userData);
})

exports.updateUserById = catchError(async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, mobile, email, password, role } = req.body;
    const Data = await userService.updateUserById({ id, first_name, last_name, mobile, email, password, role });
    res.status(200).json(user);
})