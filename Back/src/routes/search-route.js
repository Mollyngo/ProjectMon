const prisma = require('../model/prisma');


exports.findClinic = async (req, res) => {
    const name = req.query.name;
    const result = await prisma.clinic.findMany({
        where: {
            name: {
                contains: name
            },
            deletedAt: null
        }
    });
    res.json(result);
}

exports.findClinicByNameDistrictAndProvince = async (req, res) => {
    const name = req.query.name;
    const district = req.query.district;
    const province = req.query.province;
    const result = await prisma.clinic.findMany({
        where: {
            name: {
                contains: name
            },
            info: {
                mobile: true,
                working_hour: true,
                website: true,
                service: true,
                others: true,
                photo: true
            },
            district: {
                name: {
                    contains: district
                }
            },
            province: {
                name: {
                    contains: province
                }
            },
            deletedAt: null
        }
    });
    res.json(result);

}