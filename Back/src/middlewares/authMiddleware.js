const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');
const jwtService = require('../services/jwt-service');
const userService = require('../services/user-service');

const jwt = require('jsonwebtoken');

const authenticate = catchError(async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            createError('invalid authorization header', 401);
        }


        const token = authorization.split(' ')[1];
        console.log(token)
        const decodedPayload = jwtService.verify(token);
        console.log(decodedPayload)
        const user = await userService.findUserById(decodedPayload.user_id);
        if (!user) {
            createError('user was not found', 401);
        }
        delete user.password;
        req.user = user;
        req.user_id = decodedPayload.user_id

        console.log(req.user)


        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Backend error: Unauthorized' });
    }
});


module.exports = authenticate
