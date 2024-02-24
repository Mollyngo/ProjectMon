const bcrypt = require('bcrypt');
const userService = require('../services/user-service');
const jwt = require('jsonwebtoken');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');
const jwtService = require('../services/jwt-service');

exports.register = catchError(async (req, res, next) => {
    // const existsUser = await userService.findUserByEmail(req.body.email);
    // if (existsUser) {
    //     createError(400, 'มี email นี้ในระบบแล้ว');
    // }
    const { first_name, last_name, email, password, mobile, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const newUser = await userService.createUser(req.body);
    const payload = { userId: newUser.id, role: newUser.role };
    const accessToken = jwtService.sign(payload);


    res.status(201).json({ accessToken, newUser });

});

exports.login = catchError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    const existsUser = await userService.findUserByEmail(req.body.email);

    if (!existsUser) {
        createError('invalid credentials', 400);
    }
    console.log(existsUser)

    const isMatch = await bcrypt.compare(
        req.body.password,
        existsUser.password
    );
    if (!isMatch) {
        createError('invalid credentials', 400);
    }
    console.log(isMatch)

    const payload = {
        user_id: existsUser.id,
        role: existsUser.role
    };
    console.log(payload)
    const accessToken = jwtService.sign(payload);
    delete existsUser.password;


    res.status(200).json({ accessToken, user: existsUser });
})

exports.logout = catchError(async (req, res, next) => {
    res.status(200).json({ message: 'Logged out successfully' });
})
exports.getUser = catchError(async (req, res, next) => {
    console.log("sssssssssssssssssssssssssssssss")
    res.status(200).json({ user: req.user });
})