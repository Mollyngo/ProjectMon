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