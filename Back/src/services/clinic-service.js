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
                    create: {
                        name: clinicData.district,
                        province: {
                            create: {
                                name: clinicData.province,
                            },
                        },
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