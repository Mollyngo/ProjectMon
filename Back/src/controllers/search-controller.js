const clinicService = require('../services/clinic-service');
const prisma = require('../model/prisma');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');

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

router.get('/search', async (req, res, next) => {
    try {
        const { name, district, province, q } = req.query;

        let whereClause = {};

        if (name) {
            whereClause.name = {
                contains: name,
            };
        }

        if (district) {
            whereClause.district = {
                name: {
                    contains: district,
                },
            };
        }

        if (province) {
            whereClause.district = {
                province: {
                    name: {
                        contains: province,
                    },
                },
            };
        }

        if (q) {
            whereClause = {
                OR: [
                    { name: { contains: q } },
                    {
                        district: {
                            name: { contains: q },
                        },
                    },
                    {
                        district: {
                            province: {
                                name: { contains: q },
                            },
                        },
                    },
                ],
            };
        }

        const clinics = await prisma.clinic.findMany({
            where: whereClause,
            include: {
                district: {
                    include: {
                        province: true,
                    },
                },
            },
        });

        res.status(200).json(clinics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
});
