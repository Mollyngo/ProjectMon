const prisma = require('../model/prisma');

const clinicService = require('../services/clinic-service');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');

exports.getAllClinic = async (req, res, next) => {
    try {
        const result = await prisma.clinic.findMany({
            where: {
                deletedAt: null
            }
        })

    } catch (error) {
        console.error(error)
        next(error)

    }

}

exports.searchClinicFromNameDistrictAndProvince = async (req, res, next) => {
    try {
        const { name, district, province } = req.query;

        const where = {
            deletedAt: null,
        };

        if (name) {
            where.name = {
                contains: name,
            };
        }

        if (district) {
            where.district = {
                name: {
                    contains: district,
                },
            };
        }

        if (province) {
            where.district = {
                province: {
                    name: {
                        contains: province,
                    },
                },
            };
        }

        const result = await prisma.clinic.findMany({
            where,
            include: {
                district: true,
                province: true,
                info: true

            }
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
}


exports.getClinicByDistrict = async (req, res, next) => {
    try {
        const { id } = req.params;

        const clinic = await prisma.clinic.findMany({
            where: {
                district_id: parseInt(id),
            },
        });
        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}


exports.getDistrict = async (req, res, next) => {
    try {
        const district = await prisma.district.findMany();
        res.status(200).json({ district: district.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}

exports.getProvince = async (req, res, next) => {
    try {
        const province = await prisma.province.findMany();
        res.status(200).json({ province: province.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}

exports.getAllProvince = async (req, res, next) => {
    try {
        const province = await prisma.province.findMany();
        res.status(200).json(province);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}

exports.getAllDistrict = async (req, res, next) => {
    try {
        const district = await prisma.district.findMany();
        res.status(200).json(district);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}

exports.getAllClinicFindByDistrict = async (req, res, next) => {
    try {
        const clinic = await prisma.clinic.findMany();
        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}

exports.getAllClinicFindByProvince = async (req, res, next) => {
    try {
        const clinic = await prisma.clinic.findMany();
        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}


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

exports.findClinicByNameDistrictAndProvince = async (name, district, province) => {
    return await prisma.clinic.findMany({
        where: {
            name: {
                contains: name
            },
            district: {
                name: {
                    contains: district
                }
            },
            province: {
                name: {
                    contains: province
                }
            }
        }
    })
}

exports.findDistrict = (name) => prisma.district.findMany()

exports.findProvince = (name) => prisma.province.findMany()
