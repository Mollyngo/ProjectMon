const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const User = {
    // เข้าสู่ระบบ
    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user || !user.comparePassword(password)) {
            throw new Error('Invalid credentials');
        }

        return user;
    },

    // ลงทะเบียนผู้ใช้
    async register(data) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    },

    // ดึงข้อมูลผู้ใช้
    async details(id) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    },

    // แก้ไขข้อมูลผู้ใช้
    async update(id, data) {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
        });

        return user;
    },

    // ลบผู้ใช้
    async delete(id) {
        await prisma.user.delete({
            where: {
                id,
            },
        });
    },
};

module.exports = User;
