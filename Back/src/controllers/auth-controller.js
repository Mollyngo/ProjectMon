const bcrypt = require('bcrypt');
const userService = require('../services/user-service');
const jwt = require('jsonwebtoken');

// const saltRounds = 10;

// const hashPassword = async (password) => {
//     const salt = await bcrypt.genSalt(saltRounds);
//     return await bcrypt.hash(password, salt);
// };

// const auth = require('./middleware/auth');

// const roles = {
//     admin: ['create', 'read', 'update', 'delete', 'approve'],
//     user: ['create', 'read', 'update'],
// }


// const hasPermission = (role, permission) => {
//     return roles[role].includes(permission);
// };

// app.get('/clinics', auth, (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'read')) {
//         return res.status(403).send('Forbidden');
//     }

//     // ค้นหาคลินิก
//     const clinics = await Clinic.findAll();
//     res.send(clinics);
// });

const SECRET_KEY = process.env.JWT_SECRET || '1234dfcf5';
const EXPIRES_IN = process.env.JWT_EXPIRES;

exports.register = async (req, res, next) => {
    try {
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
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: EXPIRES_IN });

        res.status(200).json({ token, newUser });
    } catch (error) {
        res.status(500).send('สมัครไม่สําเร็จ');
    }

};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existsUser = await userService.findUserByEmail(email);

        // ตรวจสอบ email
        if (!existsUser || !bcrypt.compareSync(password, existsUser.password)) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ id: existsUser.id }, SECRET_KEY, { expiresIn: EXPIRES_IN });

        console.log(token);
        res.status(200).json("ล็อกอินสําเร็จ");
    } catch (error) {
        res.status(500).send('เข้าสู่ระบบไม่สําเร็จ');
    }


}

exports.logout = async (req, res, next) => {
    res.send(200).json({ message: 'Logout successfully' });

}



// app.post('/register', async (req, res) => {
//     const { email, password, role } = req.body;

//     // ตรวจสอบ Field
//     if (!validateEmail(email) || !validatePassword(password)) {
//         return res.status(400).send('Invalid field');
//     }

//     // Hash รหัสผ่าน
//     const hashedPassword = await hashPassword(password);

//     // บันทึกผู้ใช้
//     const user = await User.create({ email, password: hashedPassword, role });

//     // ส่ง Token
//     const token = generateToken(user);
//     res.send({ token });
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // ค้นหาผู้ใช้
//     const user = await User.findOne({ where: { email } });

//     // ตรวจสอบรหัสผ่าน
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).send('Invalid credentials');
//     }

//     // ส่ง Token
//     const token = generateToken(user);
//     res.send({ token });
// });

// const validateEmail = (email) => {
//     const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return regex.test(email);
// };

// const validatePassword = (password) => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^

//     Authentication Controller:

//     การเข้าสู่ระบบ:
//     ฟังก์ชันสำหรับตรวจสอบข้อมูลรับรองผู้ใช้
// ฟังก์ชันสำหรับสร้างและส่ง JWT token
// การรีเฟรช token:
// ฟังก์ชันสำหรับตรวจสอบและรีเฟรช token ที่หมดอายุ
//     การตรวจสอบสิทธิ์:
//     ฟังก์ชันสำหรับตรวจสอบสิทธิ์ผู้ใช้
// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก token
//     ข้อมูลทั่วไป:

// การจัดการ error:
// ฟังก์ชันสำหรับจัดการ error ต่างๆ
// ฟังก์ชันสำหรับส่ง response ที่เหมาะสม
//     การบันทึก:
//     ฟังก์ชันสำหรับบันทึกกิจกรรมต่างๆ
//     ฟังก์ชันสำหรับติดตามข้อผิดพลาด