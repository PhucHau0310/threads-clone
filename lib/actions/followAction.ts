import prisma from '../prisma';

export const createFollowing = async ({
    followerId,
    followingId,
}: {
    followerId: string;
    followingId: string;
}) => {
    try {
        const following = await prisma.follows.create({
            data: {
                followerId: followerId,
                followingId: followingId,
            },
        });

        if (following) {
            return following;
        } else {
            throw new Error(`Failed to following userId: ${followerId}`);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
