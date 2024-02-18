const prisma = require('../model/prisma');



exports.createClinic = async (clinicData, user_id) => { // Separate function with clear arguments
    try {
        // Add data validation and error handling here as needed

        return await prisma.clinic.create({
            data: {
                name: clinicData.name,
                info: {
                    create: {
                        mobile: clinicData.mobile,
                        working_hour: clinicData.working_hour,
                        website: clinicData.website,
                        service: clinicData.service,
                        others: clinicData.others,
                        photo: clinicData.photo,
                    },
                },
                district: {
                    connect: {
                        id: +clinicData.district_id,

                    },

                },
                user: { connect: { id: user_id } }, // Connect using user ID
            },
        });
        console.log(clinicData);
    } catch (error) {
        throw error; // Re-throw for proper error handling in `addClinic`
    }
};





exports.editClinic = async (clinic) => {
    return await prisma.clinic.update({
        where: {
            id: clinic.id
        },
        data: {
            name: clinic.name,
            info: {
                update: {
                    mobile: clinic.mobile,
                    working_hour: clinic.working_hour,
                    website: clinic.website,
                    service: clinic.service,
                    others: clinic.others,
                    photo: clinic.photo,

                },
            },
            district: {
                update: {
                    name: clinic.district,
                    province: {
                        update: {
                            name: clinic.province,
                        }
                    }
                }
            }
        }
    })
}

exports.deleteAllClinic = async (clinic) => {
    try {
        return await prisma.clinic.delete({
            where: {
                id: clinic.id
            },
            include: {
                info: true,
            }
        })

    } catch (error) {
        throw error
    }
}