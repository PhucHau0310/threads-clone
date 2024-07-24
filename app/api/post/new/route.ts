import { createPostWithHashtags } from '@/lib/actions/postAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await req.json();
        const post = await createPostWithHashtags(data);

        if (post) {
            return new NextResponse(JSON.stringify(post), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: 'Error post' }), {
            status: 500,
        });
    }
};
