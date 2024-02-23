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
        const decodedPayload = jwtService.verify(token);

        const user = await userService.findUserById(decodedPayload.userId);
        if (!user) {
            createError('user was not found', 401);
        }
        delete user.password;
        req.user = user;
        req.user.role = user.role

        console.log(req.user_id)
        console.log(req.user)
        console.log(req.headers)
        console.log(createError)

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
});


module.exports = authenticate



// middlewares /: Authentication middleware
// การตรวจสอบ token:
// ตรวจสอบว่า token ถูกต้องหรือไม่
// ดึงข้อมูลผู้ใช้จาก token
// ตรวจสอบว่า token หมดอายุหรือไม่
// รีเฟรช token(ถ้ามี)
// การจัดการสิทธิ์:
// ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึง endpoint หรือไม่
// กำหนดบทบาทผู้ใช้(ถ้ามี)
// ตัวอย่างเพิ่มเติม:
// การบันทึกกิจกรรมการเข้าถึง
// การจัดการ CSRF