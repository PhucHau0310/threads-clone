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

export const updateBio = async (userId: string, bio: string) => {
    try {
        const updated = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                bio: bio,
            },
        });

        if (updated) {
            return updated;
        }
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

export const getUserById = async (id: string) => {
    try {
        if (!id) {
            throw new Error('ID is invalid!');
        }

        const userFound = await prisma.user.findFirst({
            where: {
                id: id,
            },
            include: {
                savedPosts: {
                    include: {
                        post: {
                            include: {
                                author: true,
                            },
                        },
                        user: true,
                    },
                },
                comments: {
                    include: {
                        post: {
                            include: {
                                author: true,
                            },
                        },
                        author: true,
                    },
                },
                following: {
                    include: {
                        follower: {
                            include: {
                                posts: true,
                            },
                        },
                        following: {
                            include: {
                                posts: true,
                            },
                        },
                    },
                },
                posts: true,
                followedBy: true,
                likes: {
                    include: {
                        post: true,
                        user: true,
                    },
                },
            },
        });

        if (userFound) {
            return userFound;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getUserByUsername = async (username: string) => {
    try {
        if (!username) {
            throw new Error('username is invalid!');
        }

        const userFound = await prisma.user.findFirst({
            where: {
                username: username,
            },
            include: {
                savedPosts: {
                    include: {
                        post: {
                            include: {
                                author: true,
                            },
                        },
                        user: true,
                    },
                },
                comments: {
                    include: {
                        post: {
                            include: {
                                author: true,
                            },
                        },
                        author: true,
                    },
                },
                following: {
                    include: {
                        follower: {
                            include: {
                                posts: true,
                            },
                        },
                        following: {
                            include: {
                                posts: true,
                            },
                        },
                    },
                },
                posts: true,
                followedBy: true,
                likes: {
                    include: {
                        post: true,
                        user: true,
                    },
                },
            },
        });

        if (userFound) {
            return userFound;
        }
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
