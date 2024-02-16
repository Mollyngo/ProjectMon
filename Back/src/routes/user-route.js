const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.updateUser);

module.exports = router;


การสมัครสมาชิก
การเข้าสู่ระบบ
ข้อมูลส่วนตัว
การแก้ไขข้อมูล
การจัดการคลินิก(เพิ่ม แก้ไข ลบ)

// // Router สำหรับ Admin
// app.use('/admin', require('./routes/admin'));

// // Router สำหรับ User
// app.use('/user', require('./routes/user'));

// // จัดการข้อมูล User
// app.get('/users', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'read')) {
//         return res.status(403).send('Forbidden');
//     }

//     // ค้นหาข้อมูลผู้ใช้
//     const users = await User.findAll();
//     res.send(users);
// });

// // เพิ่มระบบ Pagination
// app.get('/clinics', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'read')) {
//         return res.status(403).send('Forbidden');
//     }

//     // ตั้งค่า Pagination
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;

//     // ค้นหาข้อมูลคลินิก
//     const clinics = await Clinic.findAll({
//         offset: (page - 1) * limit,
//         limit,
//     });
//     res.send(clinics);
// });

// // จัดการรูปภาพ
// app.post('/clinics/upload', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'update')) {
//         return res.status(403).send('Forbidden');
//     }

//     // อัปโหลดรูปภาพ
//     const { file } = req;
//     const filename = `clinic-${Date.now()}.${file.mimetype.split('/')[1]}`;
//     await file.mv(`./uploads/${filename}`);

//     // อัปเดตข้อมูลคลินิก
//     await Clinic.update({ photo: filename }, { where: { id: req.params.id } });
//     res.send('Image uploaded');
// });

// // ทดสอบ API
// app.get('/test', (req, res) => {
//     res.send('API is working');
// });
























// app.put('/users/:id', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'update')) {
//         return res.status(403).send('Forbidden');
//     }

//     // อัปเดตข้อมูลผู้ใช้
//     const user = await User.update(req.body, { where: { id: req.params.id } });
//     res.send(user);
// });

// // ลบข้อมูล User (Soft Delete)
// app.delete('/users/:id', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'delete')) {
//         return res.status(403).send('Forbidden');
//     }

//     // ลบข้อมูลผู้ใช้ (Soft Delete)
//     await User.update({ deletedAt: new Date() }, { where: { id: req.params.id } });
//     res.send('User deleted');
// });
