import prisma from '@/lib/prisma';
import { createLikePost, removeLikePost } from '@/lib/actions/likeAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await req.json();
        const { postId } = data;

        // Check if the post is already liked by the user
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: userId,
                postId: postId,
            },
        });

        if (existingLike) {
            // If already liked, remove the like
            await removeLikePost({ userId, postId });
            return new NextResponse(
                JSON.stringify({ message: 'Like removed' }),
                { status: 200 }
            );
        } else {
            // If not liked, create a like
            const post = await createLikePost({ userId, postId });
            return new NextResponse(JSON.stringify(post), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Error toggling like status' }),
            {
                status: 500,
            }
        );
    }
};
