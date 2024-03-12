const visibleClinicController = require('../controllers/visibleClinic-controller');
const express = require('express');
const router = express.Router();

//ใช้กับGuest

router.get('/all', visibleClinicController.allVisibleClinic);
router.get('/district/:district_id', visibleClinicController.visibleClinicByDistrict);
router.get('/province/:province_id', visibleClinicController.visibleClinicByProvince);
router.get('/name/:name', visibleClinicController.getVisibleClinicByName);

module.exports = router