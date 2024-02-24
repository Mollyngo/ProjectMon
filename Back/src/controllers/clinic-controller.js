const clinicService = require('../services/clinic-service');
const prisma = require('../model/prisma');
const createError = require('../utills/create-error');
const catchError = require('../utills/catch-error');

const jwt = require('jsonwebtoken');


exports.getAllClinic = async (req, res, next) => {
    try {
        const result = await clinicService.getAllClinic();
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
    }
}

exports.addClinic = async (req, res, next) => {
    try {
        const { name, mobile, working_hour, website, service, others, photo } = req.body;

        const user_id = req.user_id;

        console.log(user_id)

        const district_id = req.body.district_id

        const newClinic = await clinicService.createClinic({
            name,
            mobile,
            working_hour,
            website,
            service,
            others,
            photo,
            district_id
        }, user_id);
        console.log(createError)
        console.log(catchError)
        console.log(req.body)
        console.log(newClinic);
        res.status(200).json({ clinic: newClinic });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message }); // Pass error message
    }
};
exports.updatedClinic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, mobile, working_hour, website, service, others, photo, district_id } = req.body;
        const user_id = req.user_id;
        const updatedClinic = await clinicService.editClinic({
            id,
            name,
            mobile,
            working_hour,
            website,
            service,
            others,
            photo,
            district_id
        });
        console.log(updatedClinic);
        res.status(200).json(updatedClinic);
    } catch (error) {
        console.error(error);
    }
}

exports.deletedClinic = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.role !== 'USER') {
            return res.status(403).json({ message: "You don't have permission to delete this clinic" });
        } else {
            const deletedClinic = await clinicService.deleteClinic(id);
            console.log(deletedClinic);
            if (!deletedClinic) {
                return res.status(404).json({ message: "Clinic not found" });
            }
            res.status(200).json({ deletedClinic, message: "Clinic deleted successfully" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting clinic" });
    }
};
exports.searchClinic = async (req, res, next) => {
    try {
        const { province, district } = req.query;
        // ทำการค้นหาคลินิกตามจังหวัดและอำเภอที่ระบุ
        const clinics = await Clinic.find({ 'district.name': district, 'district.province.name': province });
        res.json(clinics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหาคลินิก' });
    }
}

exports.searchResult = async (req, res, next) => {
    try {
        const { query } = req.query;
        const result = await clinicService.getApprovedVisibleClinics(query);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
    }
}
