const clinicService = require('../services/clinic-service');
const prisma = require('../model/prisma');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');

exports.searchClinic = async (req, res, next) => {
    try {
        const { query } = req.query;
        const result = await clinicService.searchClinic(query);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message }); // Pass error message
    }
}