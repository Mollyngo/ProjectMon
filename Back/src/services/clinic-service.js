const prisma = require('../model/prisma');

exports.createClinic = async (clinic) => {
    return await prisma.clinic.create({
        data: clinic
    });
}

exports.updateClinic = async (clinic) => {
    return await prisma.clinic.update({
        where: {
            name: clinic.name
        },
        data: clinic
    });
}

exports.deleteClinic = async (clinic) => {
    return await prisma.clinic.delete({
        where: {
            name: clinic.name
        }
    });
}