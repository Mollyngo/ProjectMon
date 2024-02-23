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

router.get('/search', async (req, res, next) => {
    try {
        const { name, district, province, q } = req.query;

        let whereClause = {};

        if (name) {
            whereClause.name = {
                contains: name,
            };
        }

        if (district) {
            whereClause.district = {
                name: {
                    contains: district,
                },
            };
        }

        if (province) {
            whereClause.district = {
                province: {
                    name: {
                        contains: province,
                    },
                },
            };
        }

        if (q) {
            whereClause = {
                OR: [
                    { name: { contains: q } },
                    {
                        district: {
                            name: { contains: q },
                        },
                    },
                    {
                        district: {
                            province: {
                                name: { contains: q },
                            },
                        },
                    },
                ],
            };
        }

        const clinics = await prisma.clinic.findMany({
            where: whereClause,
            include: {
                district: {
                    include: {
                        province: true,
                    },
                },
            },
        });

        res.status(200).json(clinics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching clinics' });
    }
});
