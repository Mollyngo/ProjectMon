const searchService = require('../services/search-service');


// exports.search = async (req, res, next) => {
//     try {
//         const result = await searchService.search(req.query);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error)
//         res.status(500).json({ error: 'Error searching clinics' });
//     }
// }

// exports.searchResult = async (req, res, next) => {
//     try {
//         const { query } = req.query;
//         const result = await searchService.searchResult(query);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error)
//     }
// }

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





