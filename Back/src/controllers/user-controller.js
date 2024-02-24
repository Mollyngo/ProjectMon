const userService = require('../services/user-service');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');


exports.getAdmin = catchError(async (req, res) => {
    const user = await userService.getAdmin();
    res.status(200).json(user);
})

exports.getAllUsers = catchError(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
})

exports.getUser = catchError(async (req, res) => {

    res.status(200).json({ user: req.user });
})

exports.createUser = catchError(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
})


exports.deleteUser = catchError(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(user);
})

exports.updateUser = catchError(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
})