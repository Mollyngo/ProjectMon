const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');
const prisma = require('../model/prisma');

// const roles = {
//     admin: ['create', 'read', 'update', 'delete', 'approve'],
//     user: ['create', 'read', 'update'],
// }

const jwt = require('jsonwebtoken');

const authenticate = catchError(async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        // Check if authorization header is present
        if (!authorization) {
            throw createError(401, 'Unauthorized: Authorization header required');
        }

        // Extract token from authorization header (assuming Bearer format)
        const token = authorization.split(' ')[1];
        if (!token) {
            throw createError(401, 'Unauthorized: Invalid token format');
        }

        // Verify token and attach user data to request
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming payload contains user information
        req.user_id = decoded.id; // Extract user ID if available
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