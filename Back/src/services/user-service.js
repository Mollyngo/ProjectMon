const prisma = require('../model/prisma');

exports.findUserByEmail = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    });
}

exports.getAdminByEmail = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email,
            role: 'ADMIN'
        }
    })
}

exports.getUserByEmail = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email,
            role: 'USER'
        }
    })
}

exports.getUserInfoByRole = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: AND({
                id: req.user.id,
                role: req.user.role
            })
        })
    } catch (error) {
        console.log(error)
    }
}

exports.findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}

exports.createUser = async (user) => {
    return await prisma.user.create({
        data: user
    })
}

exports.updateUser = async (user) => {
    return await prisma.user.update({
        where: {
            id: user.id
        },
        data: user
    });
}

exports.updateUserById = (data, id) =>
    prisma.user.update({ data, where: { id } });

exports.getAllUsers = async () => {
    return await prisma.user.findMany({

    })
}