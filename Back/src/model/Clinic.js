// /การค้นหาคลินิก:
โมเดล Clinic:
ชื่อคลินิก
ที่อยู่
เบอร์โทรศัพท์
เวลาทำการ
เว็บไซต์
รูปภาพ
ผู้ใช้ที่เกี่ยวข้อง
สถานะการอนุมัติ


app.get('/clinics/search', async (req, res) => {
    const { name, district, province } = req.query;

    const where = {
        deletedAt: null,
    };

    if (name) {
        where.name = {
            contains: name,
        };
    }

    if (district) {
        where.district = {
            name: district,
        };
    }

    if (province) {
        where.province = {
            name: province,
        };
    }

    const clinics = await prisma.clinic.findMany({
        where,
    });

    res.json(clinics);
});

//การเพิ่มข้อมูลคลินิก (โดย User):
app.post('/clinics', auth, validateUser, async (req, res) => {
    const { name, district, province } = req.body;

    const clinic = await prisma.clinic.create({
        data: {
            name,
            district,
            province,
            user: {
                connect: {
                    id: req.userId,
                },
            },
        },
    });

    res.json(clinic);
});

//การอนุมัติข้อมูลคลินิก(โดย Admin):

app.put('/clinics/:id/approve', auth, async (req, res) => {
    const clinic = await prisma.clinic.update({
        where: {
            id: parseInt(req.params.id),
            deletedAt: null,
            status: 'PENDING',
        },
        data: {
            status: 'APPROVED',
        },
    });

    res.json(clinic);
});


//การลบข้อมูลคลินิก(Soft Delete):

app.delete('/clinics/:id', auth, async (req, res) => {
    const clinic = await prisma.clinic.update({
        where: {
            id: parseInt(req.params.id),
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    });

    res.json(clinic);
});
