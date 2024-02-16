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
        if (!authorization) {
            throw createError(401, 'Unauthorized');
        }

        const token = req.headers.authorization.split(' ')[1];

    } catch (error) {
        next(error);
    }
})

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