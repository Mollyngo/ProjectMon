const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Clinic = {
    // ค้นหาคลินิก
    async search(name, district, province) {
        const clinics = await prisma.clinic.findMany({
            where: {
                name: {
                    contains: name,
                },
                district,
                province,
            },
        });

        return clinics;
    },

    // ดึงข้อมูลรายละเอียดคลินิก
    async details(id) {
        const clinic = await prisma.clinic.findUnique({
            where: {
                id,
            },
            include: {
                info: true,
            },
        });

        return clinic;
    },

    // เพิ่มคลินิก
    async create(data) {
        const clinic = await prisma.clinic.create({
            data,
        });

        return clinic;
    },

    // แก้ไขคลินิก
    async update(id, data) {
        const clinic = await prisma.clinic.update({
            where: {
                id,
            },
            data,
        });

        return clinic;
    },

    // ลบ
    async delete(id) {
        await prisma.clinic.delete({
            where: {
                id,
            },
        });
    },

    async search(name, district, province) {
        const clinics = await prisma.clinic.findMany({
            where: {
                name: {
                    contains: name,
                },
                district,
                province,
            },
            include: {
                district: true,
                province: true,
            },
        });

        return clinics;
    },

    // ดึงข้อมูลรายละเอียดคลินิก
    async details(id) {
        const clinic = await prisma.clinic.findUnique({
            where: {
                id,
            },
            include: {
                info: true,
                district: true,
                province: true,
            },
        });

        return clinic;
    },
};


module.exports = Clinic;


