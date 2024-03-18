const searchService = require('../services/search-service');



exports.getAllProvince = async (req, res, next) => {
    try {
        const province = await searchService.findProvince();
        // console.log(province)
        res.status(200).json({ province });
    } catch (error) {
        next(error)

    }
}

exports.getAllDistrict = async (req, res, next) => {
    try {
        const district = await searchService.findDistrict();
        // console.log(district)
        res.status(200).json({ district });
    } catch (error) {
        next(error)
        console.log(error)
    }
}





