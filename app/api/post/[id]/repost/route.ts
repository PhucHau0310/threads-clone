import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { createRePost, removeRePost } from '@/lib/actions/repostAction';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await req.json();
        const { postId } = data;

        const existingRePost = await prisma.savedPost.findFirst({
            where: {
                userId: userId,
                postId: postId,
            },
        });

        if (existingRePost) {
            await removeRePost({ userId, postId });
            return new NextResponse(
                JSON.stringify({ message: 'RePost removed' }),
                { status: 200 }
            );
        } else {
            const post = await createRePost({ userId, postId });
            return new NextResponse(JSON.stringify(post), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Error toggling repost status' }),
            {
                status: 500,
            }
        );
    }
};
