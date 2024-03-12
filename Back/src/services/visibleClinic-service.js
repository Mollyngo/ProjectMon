const prisma = require('../model/prisma');

exports.getAllVisibleClinic = () => prisma.clinic.findMany({
    where: {

        status: 'APPROVED',
        visibility: 'VISIBLE',
    },
    include: {
        info: true,
        province: true,
        district: true,
    },
});

exports.getVisibleClinicByName = (name) => prisma.clinic.findMany({
    where: {
        name: {
            contains: name
        }
    },
    include: {
        info: true,
        province: true,
        district: true,
    }
})

exports.getVisibleClinicByProvince = (province) => prisma.clinic.findMany({
    where: {
        district: {
            province: {
                name: {
                    contains: province
                }
            }
        },
        status: 'APPROVED',
        visibility: 'VISIBLE',
    },
    include: {
        info: true,
        province: true,
        district: true,
    },
})

exports.getVisibleClinicByDistrict = (district) => prisma.clinic.findMany({
    where: {
        district: {
            name: {
                contains: district
            }
        }
    },
    include: {
        province: true,
        district: true,
    },
})