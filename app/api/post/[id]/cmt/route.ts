import { createCmtPost } from '@/lib/actions/commentActiont';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const data = await req.json();
        const cmt = await createCmtPost(data);

        if (cmt) {
            return new NextResponse(JSON.stringify(cmt), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({
                message: `Failed to comment post by id: ${params.id}`,
            }),
            { status: 500 }
        );
    }
};
