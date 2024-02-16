const clinicService = require('../services/clinic-service');


exports.addClinic = async (req, res, next) => {
    try {
        const { name, address, district, province, mobile, working_hour, website, service, others } = req.body;
        const newClinic = await clinicService.createClinic(req.body);
        const token = jwt.sign({ id: newClinic.id }, SECRET_KEY, { expiresIn: EXPIRES_IN });
        const clinic = await clinicService.findClinicById(newClinic.id);
        const user = await userService.findUserById(newClinic.user_id);

        // const { name, address, district, province, mobile, working_hour, website, service, others } = req.body;

        // const newClinic = await clinicService.createClinic({
        //     name,
        //     address,
        //     district,
        //     province,
        //     mobile,
        //     working_hour,
        //     website,
        //     service,
        //     others
        // });


        console.log(newClinic);
        res.status(201).json({ newClinic });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'เพิ่มคลินิกไม่สําเร็จ' });
        next(error);
    }
}





// const isAuthorizedToDeleteClinic = (user, name) => {
//     return user.role === 'admin' || user.name === name;
// }

// const isAuthorizedToEditClinic = (user, id) => {
//     return user.role === 'admin,user' || user.id === id;
// }

// const isAuthorizedToShowClinic = (user, name) => {
//     return user.role === 'admin' || user.name === name;
// }

// exports.editToShowClinic = async (req, res, next) => {
//     const { name } = req.body;
//     try {
//         // ตรวจสอบสิทธิ์ผู้ใช้
//         if (!isAuthorizedToShowClinic(req.user, name)) {
//             throw new Error('Unauthorized: ผู้ใช้ที่ได้รับอนุญาตเท่านั้นสามารถแก้ไขคลินิกได้');
//         } else {
//             // ค้นหาคลินิก
//             const { id, name, address, district, province, mobile, working_hour, website, service, others } = existingClinic;
//             const existingClinic = await prisma.clinic.findUnique({ where: { name } })
//             await prisma.clinic.update({
//                 where: { name },
//                 data: {
//                     name,
//                     address,
//                     district: { connect: { id: existingDistrict.id } },
//                     province: { connect: { id: existingProvince.id } },
//                     mobile,
//                     working_hour,
//                     website,
//                     service,
//                     others,
//                     photo,
//                     status,
//                     visibility
//                 }
//             })

//         }

//     }
// }


// // ฟังก์ชันสำหรับการแก้ไขคลินิก
// exports.editClinic = async (req, res, next) => {
    //     const { id, name, address, district, province, mobile, working_hour, website, service, others } = req.body;
    
    //     try {
        //         // ตรวจสอบสิทธิ์ผู้ใช้
//         if (!isAuthorizedToEditClinic(req.user, id)) {
//             throw new Error('Unauthorized: ผู้ใช้ที่ได้รับอนุญาตเท่านั้นสามารถแก้ไขคลินิกได้');
//         }

//         // ค้นหาคลินิก
//         const existingClinic = await prisma.clinic.findUnique({ where: { id } });
//         if (!existingClinic) {
//             throw new Error(`ไม่พบคลินิกที่มี ID ${id}`);
//         }

//         // แยกข้อมูล District และ Province
//         const { district: { name }, province: { id } } = req.body;

//         // ตรวจสอบว่า District นั้นมีอยู่
//         const existingDistrict = await prisma.district.findFirst({ where: { name } });
//         if (!existingDistrict) {
//             throw new Error(`ไม่พบ District ที่มีชื่อ '${name}' โปรดสร้างหรือระบุ id ของ District ที่ถูกต้อง`);
//         }

//         // แยกข้อมูล Clinic อื่น ๆ
//         const { address, mobile, working_hour, website, service, others, photo } = req.body;

//         // อัปเดต Info
//         const updatedInfo = await prisma.info.update({
//             where: { id: existingClinic.info_id },
//             data: {
//                 mobile,
//                 workingHour: working_hour,
//                 website,
//                 service,
//                 others,
//                 photo,
//             },
//         });

//         // อัปเดต Clinic
//         const updatedClinic = await prisma.clinic.update({
//             where: { id },
//             data: {
//                 name,
//                 address,
//                 district: { connect: { id: existingDistrict.id } },
//                 province: { connect: { id } },
//                 info_id: updatedInfo.id,
//             },
//         });

//         // ตอบกลับด้วยข้อมูล Clinic และ Info ที่อัปเดต
//         res.json({ clinic: updatedClinic, info: updatedInfo });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message || 'เกิดข้อผิดพลาด' });
//     }
// };


// exports.deleteClinic = async (req, res, next) => {
//     const { name } = req.body;
//     try {
//         // ตรวจสอบสิทธิ์ผู้ใช้
//         if (!isAuthorizedToDeleteClinic(req.user, name)) {
//             throw new Error('Unauthorized:Adminเท่านั้นสามารถลบคลินิกได้');

//         } else {
//             // ลบคลินิก
//             const deletedClinic = await prisma.clinic.delete({
//                 where: {
//                     name
//                 }
//             })
//         }
//     } catch (error) {
//         next(error);
//     }
// }



// const ClinicController = {
//     // ฟังก์ชันสำหรับการเพิ่มคลินิกใหม่
//     async addClinic(req, res) {
//         try {
//             // โค้ดสำหรับการเพิ่มคลินิกใหม่
//         } catch (error) {
//             console.error('Error adding clinic:', error);
//             res.status(500).json({ error: 'An error occurred while adding clinic' });
//         }
//     },

//     // ฟังก์ชันสำหรับการแก้ไขข้อมูลคลินิก
//     async editClinic(req, res) {
//         try {
//             // โค้ดสำหรับการแก้ไขข้อมูลคลินิก
//         } catch (error) {
//             console.error('Error editing clinic:', error);
//             res.status(500).json({ error: 'An error occurred while editing clinic' });
//         }
//     },

//     // ฟังก์ชันสำหรับการลบคลินิก
//     async deleteClinic(req, res) {
//         try {
//             // โค้ดสำหรับการลบคลินิก
//         } catch (error) {
//             console.error('Error deleting clinic:', error);
//             res.status(500).json({ error: 'An error occurred while deleting clinic' });
//         }
//     },

//     // ฟังก์ชันสำหรับการอนุมัติคลินิกโดยผู้ดูแลระบบ
//     async approveClinic(req, res) {
//         try {
//             // โค้ดสำหรับการอนุมัติคลินิก
//         } catch (error) {
//             console.error('Error approving clinic:', error);
//             res.status(500).json({ error: 'An error occurred while approving clinic' });
//         }
//     }
// };

// module.exports = ClinicController;



// Clinic Controller:

// การค้นหา:
// ฟังก์ชันสำหรับค้นหาคลินิกตามชื่อ เขต จังหวัด ฯลฯ
// ฟังก์ชันสำหรับการกรองและเรียงลำดับผลลัพธ์
// ฟังก์ชันสำหรับการแบ่งหน้า
// ข้อมูลคลินิก:
// ฟังก์ชันสำหรับดึงข้อมูลคลินิก
// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ที่เกี่ยวข้อง(ถ้ามี)
// การจัดการคลินิก(โดย User):
// ฟังก์ชันสำหรับเพิ่มคลินิก
// ฟังก์ชันสำหรับแก้ไขคลินิก
// ฟังก์ชันสำหรับลบคลินิก(Soft Delete)
// การจัดการคลินิก(โดย Admin):
// ฟังก์ชันสำหรับอนุมัติคลินิก
// ฟังก์ชันสำหรับระงับคลินิก
// ฟังก์ชันสำหรับลบคลินิก(ถาวร)




// // exports.getClinic = async (req, res) => {
// //     const clinic = await Clinic.findByName(req.params.name);
// //     res.json(clinic);
// // };

// // exports.createClinic = async (req, res) => {
// //     const clinic = new Clinic(req.body);
// //     await clinic.save();
// //     res.status(201).json(clinic);
// // };

// // exports.updateClinic = async (req, res) => {
// //     const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.json(clinic);
// // };

// // exports.deleteClinic = async (req, res) => {
// //     await Clinic.findByIdAndDelete(req.params.id);
// //     res.status(204).json();
// // };
