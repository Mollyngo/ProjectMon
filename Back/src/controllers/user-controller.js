// src/controllers/UserController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const UserController = {
//     // ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
//     async register(req, res) {
//         try {
//             // โค้ดสำหรับการลงทะเบียนผู้ใช้
//         } catch (error) {
//             console.error('Error registering user:', error);
//             res.status(500).json({ error: 'An error occurred while registering user' });
//         }
//     },

//     // ฟังก์ชันสำหรับการเข้าสู่ระบบ
//     async login(req, res) {
//         try {
//             // โค้ดสำหรับการเข้าสู่ระบบผู้ใช้
//         } catch (error) {
//             console.error('Error logging in user:', error);
//             res.status(500).json({ error: 'An error occurred while logging in user' });
//         }
//     },

//     // ฟังก์ชันสำหรับการแสดงข้อมูลผู้ใช้
//     async getUser(req, res) {
//         try {
//             // โค้ดสำหรับการแสดงข้อมูลผู้ใช้
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             res.status(500).json({ error: 'An error occurred while fetching user data' });
//         }
//     },

//     // ฟังก์ชันสำหรับการแก้ไขข้อมูลผู้ใช้
//     async updateUser(req, res) {
//         try {
//             // โค้ดสำหรับการแก้ไขข้อมูลผู้ใช้
//         } catch (error) {
//             console.error('Error updating user data:', error);
//             res.status(500).json({ error: 'An error occurred while updating user data' });
//         }
//     }
// };

// module.exports = UserController;


// การสมัครสมาชิก:
// ฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูลผู้ใช้
// ฟังก์ชันสำหรับการเข้ารหัสลับรหัสผ่าน
// ฟังก์ชันสำหรับสร้างผู้ใช้ในฐานข้อมูล
// ฟังก์ชันสำหรับส่งอีเมลยืนยัน(ถ้ามี)
// การเข้าสู่ระบบ:
// ฟังก์ชันสำหรับตรวจสอบข้อมูลรับรองผู้ใช้
// ฟังก์ชันสำหรับสร้างและส่ง JWT token
// ฟังก์ชันสำหรับจัดการ refresh token(ถ้ามี)
// ข้อมูลส่วนตัว:
// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
// ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
// การจัดการสิทธิ์:
// ฟังก์ชันสำหรับตรวจสอบสิทธิ์ผู้ใช้
// ฟังก์ชันสำหรับกำหนดบทบาทผู้ใช้(ถ้ามี)


// app.get('/clinics/:id', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'read')) {
//         return res.status(403).send('Forbidden');
//     }

//     // ค้นหาข้อมูลคลินิก
//     const clinic = await Clinic.findByPk(req.params.id);
//     res.send(clinic);
// });

// app.put('/clinics/:id', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'update')) {
//         return res.status(403).send('Forbidden');
//     }

//     // อัปเดตข้อมูลคลินิก
//     const clinic = await Clinic.update(req.body, { where: { id: req.params.id } });
//     res.send(clinic);
// });

// app.delete('/clinics/:id', auth, async (req, res) => {
//     // ตรวจสอบสิทธิ์
//     if (!hasPermission(req.user.role, 'delete')) {
//         return res.status(403).send('Forbidden');
//     }

//     // ลบข้อมูลคลินิก (Soft Delete)
//     await Clinic.update({ deletedAt: new Date() }, { where: { id: req.params.id } });
//     res.send('Clinic deleted');
// });
