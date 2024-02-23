const express = require('express');
const clinicController = require('../controllers/clinic-controller');
const SearchController = require('../controllers/search-controller')

const router = express.Router();

router.post('/add', clinicController.addClinic);
router.get('/search', clinicController.searchClinic);
router.patch('/:id', clinicController.updatedClinic);
router.delete('/:id', clinicController.deletedClinic);
router.get('/district', (req, res) => {
    res.send(SearchController.getAllDistrict());
});

router.get('/province', (req, res) => {
    res.send(SearchController.getAllProvince());
});

router.get('/', (req, res) => {
    res.send(SearchController.getAllClinic());
});



module.exports = router;