const express = require('express');
const router = express.Router();
const ClinicController = require('../controllers/ClinicController');

router.post('/add', ClinicController.addClinic);
router.put('/edit/:id', ClinicController.editClinic);
router.delete('/delete/:id', ClinicController.deleteClinic);
router.put('/approve/:id', ClinicController.approveClinic);

module.exports = router;

การสมัครสมาชิก
การเข้าสู่ระบบ
ข้อมูลส่วนตัว
การแก้ไขข้อมูล
การจัดการคลินิก(เพิ่ม แก้ไข ลบ)

// app.get('/clinics', auth, async (req, res) => {
//     const clinics = await prisma.clinic.findMany({
//         where: {
//             deletedAt: null,
//         },
//     });
//     res.json(clinics);
// });

// app.get('/clinics/:id', auth, async (req, res) => {
//     const clinic = await prisma.clinic.findUnique({
//         where: {
//             id: parseInt(req.params.id),
//             deletedAt: null,
//         },
//     });
//     res.json(clinic);
// });




// app.get('/clinics/search', async (req, res) => {
//     const { name, district, province } = req.query;

//     const where = {
//         deletedAt: null,
//     };

//     if (name) {
//         where.name = {
//             contains: name,
//         };
//     }

//     if (district) {
//         where.district = {
//             name: district,
//         };
//     }

//     if (province) {
//         where.province = {
//             name: province,
//         };
//     }

//     const clinics = await prisma.clinic.findMany({
//         where,
//     });

//     res.json(clinics);
// });


// //เพิ่มข้อมูลคลินิก(โดย User):
// //JavaScript
// app.post('/clinics', auth, validateUser, async (req, res) => {
//     const { name, district, province } = req.body;

//     const clinic = await prisma.clinic.create({
//         data: {
//             name,
//             district,
//             province,
//             user: {
//                 connect: {
//                     id: req.userId,
//                 },
//             },
//         },
//     });

//     res.json(clinic);
// });

// //อนุมัติข้อมูลคลินิก(โดย Admin):
// app.put('/clinics/:id/approve', auth, async (req, res) => {
//     const clinic = await prisma.clinic.update({
//         where: {
//             id: parseInt(req.params.id),
//             deletedAt: null,
//             status: 'PENDING',
//         },
//         data: {
//             status: 'APPROVED',
//         },
//     });

//     res.json(clinic);
// });

// //ลบข้อมูลคลินิก (Soft Delete):
// app.delete('/clinics/:id', auth, async (req, res) => {
//     const clinic = await prisma.clinic.update({
//         where: {
//             id: parseInt(req.params.id),
//             deletedAt: null,
//         },
//         data: {
//             deletedAt: new Date(),
//         },
//     });

//     res.json(clinic);
// });
