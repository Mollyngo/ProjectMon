const userService = require('../services/user-service');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');


exports.getAdmin = catchError(async (req, res) => {
    const user = await userService.getAdmin();
    res.status(200).json(user);
})

exports.getUsers = catchError(async (req, res) => {
    const users = await userService.getUsers();
    res.status(200).json(users);
})

exports.getAllUsers = catchError(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
})