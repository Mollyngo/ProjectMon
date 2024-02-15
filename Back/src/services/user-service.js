const prisma = require('../model/prisma');

exports.findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
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

    });
}

exports.updateUser = async (user) => {
    return await prisma.user.update({
        where: {
            id: user.id
        },
        data: user
    });
}