const express = require('express');
const clinicController = require('../controllers/clinic-controller');
const SearchController = require('../controllers/search-controller')
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

//-----------guest---------------//
router.get('/all', clinicController.getAllVisibleClinic);
router.get('/all/:id', clinicController.getGuestClinicById)
router.get('/search', clinicController.searchClinic);

//-----------USER----------------//
router.post('/add', authenticate, clinicController.addClinic);
// router.patch('/edit/:id', authenticate, clinicController.updatedClinic);
router.patch('/edit/:id', authenticate, clinicController.updatedClinic);

router.delete('/:id', authenticate, clinicController.deletedClinic);

router.get('/', clinicController.getClinicByProvince);
router.get('/search/:id', clinicController.getClinicById);

router.get('/province', SearchController.getAllProvince);
router.get('/district', SearchController.getAllDistrict);

//----------------ADMIN--------------//
router.patch('/visibility/:id', authenticate, clinicController.updateClinicVisibility)
router.patch('/status/:id', authenticate, clinicController.updateClinicStatus);


module.exports = router;