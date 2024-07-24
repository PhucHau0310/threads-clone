import { getAllPosts } from '@/lib/actions/postAction';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const posts = await getAllPosts();

        if (posts) {
            return new NextResponse(JSON.stringify(posts), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Error get all posts' }),
            { status: 500 }
        );
    }
};
