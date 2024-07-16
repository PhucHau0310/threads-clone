import prisma from '../prisma';

interface User {
    id: string;
    name: string;
    email: string;
    username?: string | null;
    password?: string;
    bio?: string;
    profileImage: string;
}

export const createOrUpdateUser = async (dataUser: User) => {
    try {
        const createdUser = await prisma.user.findFirst({
            where: {
                id: dataUser.id,
            },
        });

        if (!createdUser) {
            const newUser = await prisma.user.create({
                data: dataUser,
            });

            return newUser;
        }

        return;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteUser = async (idUser: string) => {
    try {
        const userDeleted = await prisma.user.delete({
            where: {
                id: idUser,
            },
        });

        return userDeleted;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllUser = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.log(error);
        return error;
    }
};
