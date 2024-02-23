const searchService = require('../services/search-service');

exports.search = async (req, res, next) => {
    try {
        const result = await searchService.search(req.query);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
}

exports.searchResult = async (req, res, next) => {
    try {
        const { query } = req.query;
        const result = await searchService.searchResult(query);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
    }
}

exports.getAllProvince = async (req, res, next) => {
    try {
        const province = await searchService.getAllProvince();
        res.status(200).json(province);
    } catch (error) {
        console.error(error);
    }
}


exports.getProvince = async (req, res, next) => {
    try {
        const province = await searchService.getProvince();
        res.status(200).json({ province: province.name });
    } catch (error) {
        console.error(error);
    }
}


exports.getDistrictFromProvince = async (req, res, next) => {
    try {
        const { id } = req.params;
        const district = await searchService.getDistrictFromProvince(id);
        res.status(200).json(district);
    } catch (error) {
        console.error(error);
    }
}


exports.getAllDistrict = async (req, res, next) => {
    try {
        const district = await searchService.getAllDistrict();
        res.status(200).json(district);
    } catch (error) {
        console.error(error);
    }
}

exports.getClinicByDistrict = async (req, res, next) => {
    try {
        const { id } = req.params;
        const clinic = await searchService.getClinicByDistrict(id);
        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
    }
}

exports.getAllClinic = async (req, res, next) => {
    try {
        const result = await searchService.getAllClinic();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
    }
}

exports.getAllClinicFindByProvince = async (req, res, next) => {
    try {
        const clinic = await searchService.getAllClinicFindByProvince();
        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
    }
}

exports.getAllClinicFindByDistrict = async (req, res, next) => {
    try {
        const clinic = await searchService.getAllClinicFindByDistrict();
        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
    }
}

