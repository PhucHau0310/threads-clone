import prisma from '../prisma';

interface Like {
    userId: string;
    postId: string;
}

export const createLikePost = async (dataLike: Like) => {
    try {
        const liked = await prisma.like.create({
            data: {
                userId: dataLike.userId,
                postId: dataLike.postId,
            },
        });

        return liked;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const removeLikePost = async (dataLike: Like) => {
    try {
        const removeLike = await prisma.like.deleteMany({
            where: {
                userId: dataLike.userId,
                postId: dataLike.postId,
            },
        });

        return removeLike;
    } catch (error) {
        console.log(error);
        return error;
    }
};
