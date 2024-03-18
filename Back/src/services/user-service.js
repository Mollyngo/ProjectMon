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

exports.findUserById = id => prisma.user.findUnique({ where: { id } });


exports.createUser = async (user) => {
    return await prisma.user.create({
        data: {
            ...user,
            role: 'USER',
        }
    })
}

exports.updateUser = async (userData) => {
    const dataToUpdate = {};

    if (userData.first_name) {
        dataToUpdate.first_name = userData.first_name;
    }

    if (userData.last_name) {
        dataToUpdate.last_name = userData.last_name;
    }

    if (userData.mobile) {
        dataToUpdate.mobile = userData.mobile;
    }

    if (userData.password) {
        dataToUpdate.password = userData.password;
    }

    if (userData.email) {
        dataToUpdate.email = userData.email;
    }

    if (userData.role) {
        dataToUpdate.role = userData.role;
    }
    console.log(dataToUpdate)
    return await prisma.user.update({
        where: {
            id: +userData.id
        },
        data: dataToUpdate
    });
}

exports.deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id: +id
        }
    })
}

exports.getAllUsers = async () => {
    return await prisma.user.findMany({
    })
}