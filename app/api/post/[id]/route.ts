import { getPostById } from '@/lib/actions/postAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const post = await getPostById(params.id);

        if (post) {
            return new NextResponse(JSON.stringify(post), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ message: 'Error get post' }), {
            status: 500,
        });
    }
};
