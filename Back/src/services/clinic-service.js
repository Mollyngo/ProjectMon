const prisma = require('../model/prisma');


//----------------------guest-----------------------------//

exports.getApprovedVisibleClinics = async () => {
    return await prisma.clinic.findMany({
        where: {
            status: 'APPROVED',
            visibility: 'VISIBLE'
        },
        include: {
            info: true,
            district: {
                include: {
                    province: true
                }
            }
        }
    });
}
exports.getApprovedVisibleClinicsById = async (id) => {
    return await prisma.clinic.findMany({
        where: {
            status: 'APPROVED',
            visibility: 'VISIBLE',
            id: +id
        },
        include: {
            info: true,
            district: {
                include: {
                    province: true
                }
            }
        }
    });
}


//------------------USER-------------------//
exports.createClinic = async (clinicData, user_id) => {
    try {
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
    } catch (error) {
        throw error; // Re-throw for proper error handling in `addClinic`
    }
};
exports.editClinic = async (clinicData) => {
    try {
        const dataToUpdate = {};

        if (clinicData.name) {
            dataToUpdate.name = clinicData.name;
        }

        if (clinicData.mobile) {
            dataToUpdate.info = {
                update: {
                    mobile: clinicData.mobile,
                },
            };
        }

        if (clinicData.working_hour) {
            dataToUpdate.info = {
                update: {
                    working_hour: clinicData.working_hour,
                },
            };
        }
        if (clinicData.website) {
            dataToUpdate.info = {
                update: {
                    website: clinicData.website,
                }
            }
        }
        if (clinicData.service) {
            dataToUpdate.info = {
                update: {
                    service: clinicData.service,
                }
            }
        }
        if (clinicData.others) {
            dataToUpdate.info = {
                update: {
                    others: clinicData.others,
                }
            }
        }
        if (clinicData.photo) {
            dataToUpdate.info = {
                update: {
                    photo: clinicData.photo,
                }
            }
        }
        if (clinicData.district_id) {
            dataToUpdate.district = {
                connect: {
                    id: +clinicData.district_id,
                },
            };
        }
        return await prisma.clinic.update({
            where: {
                id: +clinicData.id,
            },
            data: dataToUpdate,
        });
        console.log(clinicData);
    } catch (error) {
        console.error("Error updating clinic:", error);
        throw error;
    }
};


exports.deleteClinic = async (id) => {
    try {
        return await prisma.clinic.delete({
            where: {
                id: +id,
            },
        });
    } catch (error) {
        console.error("Error deleting clinic:", error);
        throw error;
    }
};

exports.getAllClinicIncludeProvinceById = async (id) => {
    return await prisma.clinic.findMany({
        where: {
            id: +id
        },
        include: {
            info: true,
            district: {
                include: {
                    province: true
                }
            }
        }
    });
}
exports.getAllClinicIncludeProvince = async () => {
    return await prisma.clinic.findMany({
        include: {
            info: true,
            district: {
                include: {
                    province: true
                }
            }
        }
    });
}
//--------------------------------Admin----------//

exports.updateClinicVisibility = async (id, visibility) => {
    try {
        return await prisma.clinic.update({
            where: { id: +id },
            data: { visibility }
        });
    } catch (error) {
        throw error;
    }
}
exports.updateClinicStatus = async (id, status) => {
    try {
        return await prisma.clinic.update({
            where: { id: +id },
            data: { status }
        });
    } catch (error) {
        throw error;
    }
}