const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

const auth = require('./middleware/auth');

const roles = {
    admin: ['create', 'update', 'delete'],
    user: ['read'],
};

const hasPermission = (role, permission) => {
    return roles[role].includes(permission);
};

app.get('/clinics', auth, (req, res) => {
    // ตรวจสอบสิทธิ์
    if (!hasPermission(req.user.role, 'read')) {
        return res.status(403).send('Forbidden');
    }

    // ค้นหาคลินิก
    const clinics = await Clinic.findAll();
    res.send(clinics);
});

app.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    // ตรวจสอบ Field
    if (!validateEmail(email) || !validatePassword(password)) {
        return res.status(400).send('Invalid field');
    }

    // Hash รหัสผ่าน
    const hashedPassword = await hashPassword(password);

    // บันทึกผู้ใช้
    const user = await User.create({ email, password: hashedPassword, role });

    // ส่ง Token
    const token = generateToken(user);
    res.send({ token });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้
    const user = await User.findOne({ where: { email } });

    // ตรวจสอบรหัสผ่าน
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    // ส่ง Token
    const token = generateToken(user);
    res.send({ token });
});

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^

    Authentication Controller:

    การเข้าสู่ระบบ:
    ฟังก์ชันสำหรับตรวจสอบข้อมูลรับรองผู้ใช้
ฟังก์ชันสำหรับสร้างและส่ง JWT token
การรีเฟรช token:
ฟังก์ชันสำหรับตรวจสอบและรีเฟรช token ที่หมดอายุ
    การตรวจสอบสิทธิ์:
    ฟังก์ชันสำหรับตรวจสอบสิทธิ์ผู้ใช้
ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก token
    ข้อมูลทั่วไป:

การจัดการ error:
ฟังก์ชันสำหรับจัดการ error ต่างๆ
ฟังก์ชันสำหรับส่ง response ที่เหมาะสม
    การบันทึก:
    ฟังก์ชันสำหรับบันทึกกิจกรรมต่างๆ
    ฟังก์ชันสำหรับติดตามข้อผิดพลาด