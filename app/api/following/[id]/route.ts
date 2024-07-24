import { createFollowing } from '@/lib/actions/followAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { followerId, followingId } = await req.json();

        if (!followerId || !followingId) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        if (userId !== followerId) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        const followed = await prisma.follows.findFirst({
            where: {
                followerId: followerId,
                followingId: followingId,
            },
        });

        if (followed) {
            const removeFollow = await prisma.follows.deleteMany({
                where: {
                    followerId: followerId,
                    followingId: followingId,
                },
            });

            if (removeFollow.count > 0) {
                return new NextResponse(
                    JSON.stringify({ message: 'Unfollowed successfully' }),
                    { status: 200 }
                );
            } else {
                return new NextResponse(
                    JSON.stringify({ message: 'Failed to unfollow' }),
                    { status: 500 }
                );
            }
        } else {
            const following = await createFollowing({
                followerId,
                followingId,
            });

            if (following) {
                return new NextResponse(
                    JSON.stringify({
                        message: 'Followed successfully',
                        data: following,
                    }),
                    { status: 200 }
                );
            } else {
                return new NextResponse(
                    JSON.stringify({ message: 'Failed to follow' }),
                    { status: 500 }
                );
            }
        }
    } catch (error) {
        console.error('Error in follow/unfollow route:', error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
};
