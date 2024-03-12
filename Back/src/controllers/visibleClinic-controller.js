
const {
    getAllVisibleClinic,
    getVisibleClinicByDistrict,
    getVisibleClinicByName,
    getVisibleClinicByProvince,
} = require('../services/visibleClinic-service');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

exports.allVisibleClinic = catchError(async (req, res) => {
    const visibleClinic = await getAllVisibleClinic();
    res.status(200).json(visibleClinic);
})

exports.visibleClinicByDistrict = catchError(async (req, res) => {
    const visibleClinic = await getVisibleClinicByDistrict(req.params.district_id);
    res.status(200).json(visibleClinic);
})

exports.visibleClinicByProvince = catchError(async (req, res) => {
    const visibleClinic = await getVisibleClinicByProvince(req.params.province_id);
    res.status(200).json(visibleClinic);
})

exports.getVisibleClinicByName = catchError(async (req, res) => {
    const visibleClinic = await getVisibleClinicByName(req.params.name);
    res.status(200).json(visibleClinic);
})

