const clinicService = require('../services/clinic-service');
const prisma = require('../model/prisma');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');


exports.addClinic = async (req, res, next) => {
    try {
        const {  name, district, province, mobile, working_hour, website, service, others, photo } = req.body;

        const user_id = req.user_id;

        const newClinic = await clinicService.createClinic({
            name,
            district,
            province,
            mobile,
            working_hour,
            website,
            service,
            others,
            photo,
        }, user_id);
        console.log(createError)
        console.log(catchError)
        console.log(req.body)
        console.log(newClinic);
        res.status(200).json(newClinic);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message }); // Pass error message
    }
};

exports.updatedClinic = async (req, res, next) => {
    try {
        const { name, district, province, mobile, working_hour, website, service, others, photo } = req.body;
        const user_id = req.user_id;
        const updatedClinic = await clinicService.editClinic({
            name,
            district,
            province,
            mobile,
            working_hour,
            website,
            service,
            others,
            photo
        }, user_id);
        console.log(updatedClinic);
        res.status(200).json(updatedClinic);

    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.deletedClinic = async (req, res, next) => {
    try {
        const { name } = req.body;
        const user_id = req.user_id;
        const deletedClinic = await clinicService.deleteClinic({
            name
        })
        res.status(200).json(deletedClinic);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

exports. getClinics = async (req, res, next) => {
    try {
        const clinics = await clinicService.findClinics();
        res.status(200).json({ clinics });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'หาคลินิกไม่สําเร็จ' });
    }

}

exports.searchClinic = async (req, res, next) => {
   res.status(200).json({ msg: 'searchClinic' });
    console.log(req.body)
    console.log(res)
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



