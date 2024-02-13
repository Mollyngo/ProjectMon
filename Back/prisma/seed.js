const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const hashedPassword = await bcrypt.hash('password', 10);

const user = [{
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@admin',
    mobile: '0123456789',
    password: hashedPassword
},
{
    first_name: 'user',
    last_name: 'user',
    email: 'user@user',
    mobile: '0123456789',
    password: hashedPassword
}
]

const clinic = [
    {
        name: 'clinic1',
        address: 'address',
        district_id: 1,
        info_id: 1,
        status: 1
    },
    {
        name: 'clinic2',
        address: 'address',
        district_id: 2,
        info_id: 2,
        status: 1
    },
    {
        name: 'clinic3',
        address: 'address',
        district_id: 3,
        info_id: 3,
        status: 1
    }

]

const info = [
    {
        mobile: '0123456789',
        working_hour: '10:00 - 20:00',
        website: 'www.clinic1.com',
        service: 'service',
        others: 'others',
        photo: 'photo'

    },
    {
        mobile: '0123456789',
        working_hour: '10:00 - 20:00',
        website: 'www.clinic2.com',
        service: 'service',
        others: 'others',
        photo: 'photo'

    }
]

const district = [
    {
        name: 'district1',
        province_id: 1
    },
    {
        name: 'district2',
        province_id: 2
    },
    {
        name: 'district3',
        province_id: 3
    }
]

const province = [
    {
        name: 'province1'
    },
    {
        name: 'province2'
    },
    {
        name: 'province3'
    }
]

async function seed() {
    await prisma.user.createMany({
        data: user
    })
    await prisma.clinic.createMany({
        data: clinic
    })
    await prisma.info.createMany({
        data: info
    })
    await prisma.district.createMany({
        data: district
    })
    await prisma.province.createMany({
        data: province
    })

}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });