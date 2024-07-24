import { getAllUser } from '@/lib/actions/userAction';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const users = await getAllUser();

        if (users) {
            return new NextResponse(JSON.stringify(users), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Error get all users' }),
            { status: 500 }
        );
    }
};
