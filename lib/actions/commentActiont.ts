import prisma from '../prisma';

interface Comment {
    content: string;
    userId: string;
    postId: string;
    imageCmt: string | null | undefined;
}

export const createCmtPost = async (dataCmt: Comment) => {
    try {
        const commented = await prisma.comment.create({
            data: {
                content: dataCmt.content,
                authorId: dataCmt.userId,
                postId: dataCmt.postId,
                imageCmt: dataCmt.imageCmt,
            },
        });

        return commented;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const removeCmtPost = async (dataCmt: Comment) => {
    try {
        const removeLike = await prisma.comment.deleteMany({
            where: {
                authorId: dataCmt.userId,
                postId: dataCmt.postId,
            },
        });

        return removeLike;
    } catch (error) {
        console.log(error);
        return error;
    }
};
