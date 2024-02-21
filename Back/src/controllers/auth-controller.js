const bcrypt = require('bcrypt');
const userService = require('../services/user-service');
const jwt = require('jsonwebtoken');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');


const SECRET_KEY = process.env.JWT_SECRET || '1234dfcf5';
const EXPIRES_IN = process.env.JWT_EXPIRES;

exports.register = async (req, res, next) => {
    try {
        const existsUser = await userService.findUserByEmail(req.body.email);
        if (existsUser) {
            createError(400, 'มี email นี้ในระบบแล้ว');
        }
        const { first_name, last_name, email, password, mobile, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userService.createUser({
            first_name,
            last_name,
            email,
            mobile,
            password: hashedPassword,
            role
        });
        const payload = {
            id: newUser.id
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

        res.status(200).json({ token, newUser });
    } catch (error) {
        res.status(500).send('สมัครไม่สําเร็จ');
    }

};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const existsUser = await userService.findUserByEmail(req.body.email);

        // ตรวจสอบ email
        if (!existsUser) {
            createError(401, 'email หรือ password ไม่ถูกต้อง')
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            existsUser.password
        );
        if (!isMatch) {
            createError(401, 'email หรือ password ไม่ถูกต้อง')
        }

        const payload = {
            id: existsUser.id
        }

        const token = jwt.sign(
            payload, SECRET_KEY, { expiresIn: EXPIRES_IN });

        console.log(token);
        res.status(200).json({ token, user: existsUser });
    } catch (error) {
        res.status(500).send('เข้าสู่ระบบไม่สําเร็จ');
    }
}

exports.logout = async (req, res, next) => {
    res.send(200).json({ message: 'Logout successfully' });

}

exports.getUser = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}