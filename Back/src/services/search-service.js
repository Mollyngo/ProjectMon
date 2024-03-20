const prisma = require('../model/prisma');

const clinicService = require('../services/clinic-service');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');


exports.findDistrict = (name) => prisma.district.findMany()

exports.findProvince = (name) => prisma.province.findMany()

