import prisma from '../prisma';

interface Post {
    content: string;
    imageUrl?: string;
    authorId: string;
    hashtags: string[];
}

export const createPostWithHashtags = async (dataPost: Post) => {
    try {
        const post = await prisma.post.create({
            data: {
                content: dataPost.content,
                imageUrl: dataPost.imageUrl,
                authorId: dataPost.authorId,
            },
        });

        if (dataPost.hashtags.length !== 0) {
            for (const tag of dataPost.hashtags) {
                let hashtag = await prisma.hashtag.findUnique({
                    where: { name: tag },
                });

                if (!hashtag) {
                    hashtag = await prisma.hashtag.create({
                        data: { name: tag },
                    });
                }

                await prisma.postHashtag.create({
                    data: {
                        postId: post.id,
                        hashtagId: hashtag.id,
                    },
                });
            }

            return post;
        }

        return post;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                hashtags: true,
                author: true,
                likes: true,
                comments: true,
                savedBy: true,
            },
        });

        if (posts) {
            return posts;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getPostById = async (id: string) => {
    try {
        const postFound = await prisma.post.findFirst({
            where: {
                id: id,
            },
            include: {
                hashtags: true,
                author: true,
                likes: true,
                comments: {
                    include: {
                        author: true,
                    },
                },
                savedBy: true,
            },
        });

        if (postFound) {
            return postFound;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
