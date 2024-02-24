const express = require('express');
const clinicController = require('../controllers/clinic-controller');
const SearchController = require('../controllers/search-controller')
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authenticate, clinicController.addClinic);
router.get('/search', clinicController.searchClinic);
router.patch('/:id', authenticate, clinicController.updatedClinic);
router.delete('/:id', authenticate, clinicController.deletedClinic);
router.get('/district', SearchController.getAllDistrict);

router.get('/province', SearchController.getAllProvince);


router.get('/', SearchController.getAllClinic);




module.exports = router;