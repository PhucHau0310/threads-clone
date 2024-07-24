import prisma from '../prisma';

interface SavedPost {
    userId: string;
    postId: string;
}

export const createRePost = async (dataSaved: SavedPost) => {
    try {
        const savedPost = await prisma.savedPost.create({
            data: {
                userId: dataSaved.userId,
                postId: dataSaved.postId,
            },
        });

        return savedPost;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const removeRePost = async (dataSaved: SavedPost) => {
    try {
        const removeRePost = await prisma.savedPost.deleteMany({
            where: {
                userId: dataSaved.userId,
                postId: dataSaved.postId,
            },
        });

        return removeRePost;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllRePosts = async (dataSaved: SavedPost) => {
    try {
        const allRePosts = await prisma.savedPost.findMany();

        return allRePosts;
    } catch (error) {
        console.log(error);
        return error;
    }
};
