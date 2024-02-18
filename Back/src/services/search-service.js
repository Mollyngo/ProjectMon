const prisma = require('../model/prisma');

exports.findClinicByName = async (name) => {
    return await prisma.clinic.findMany({
        where: {
            name: {
                contains: name
            }
        }
    })
}

exports.findClinicByDistrict = async (district) => {
    return await prisma.clinic.findMany({
        where: {
            district: {
                name: {
                    contains: district
                }
            }
        }
    })
}

exports.findClinicByProvince = async (province) => {
    return await prisma.clinic.findMany({
        where: {
            district: {
                province: {
                    name: {
                        contains: province
                    }
                }
            }
        }
    })
}