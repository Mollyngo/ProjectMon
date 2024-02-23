const express = require('express');
const clinicController = require('../controllers/clinic-controller');
const SearchController = require('../controllers/search-controller')

const router = express.Router();

router.post('/add', clinicController.addClinic);
router.get('/search', clinicController.searchClinic);
router.patch('/:id', clinicController.updatedClinic);
router.delete('/:id', clinicController.deletedClinic);
router.get('/district', SearchController.getAllDistrict);

router.get('/province', SearchController.getAllProvince);


router.get('/', SearchController.getAllClinic);




module.exports = router;