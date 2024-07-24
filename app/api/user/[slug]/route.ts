import {
    getUserById,
    getUserByUsername,
    updateBio,
} from '@/lib/actions/userAction';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { slug: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const slug = params.slug;
        const isId = slug.includes('user');
        let userFound;

        if (isId) {
            userFound = await getUserById(slug);
        } else {
            userFound = await getUserByUsername(slug);
        }

        if (userFound) {
            return new NextResponse(JSON.stringify(userFound), { status: 200 });
        } else {
            return new NextResponse('User not found', { status: 404 });
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Error get user by id or username' }),
            { status: 500 }
        );
    }
};

export const PUT = async (
    req: NextRequest,
    { params }: { params: { slug: string } }
) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const slug = params.slug;
        const isId = slug.includes('user');
        const { bio } = await req.json();

        if (isId) {
            const userFound = await updateBio(slug, bio);
            return new NextResponse(
                JSON.stringify({ message: 'Update User Success' }),
                { status: 200 }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ message: 'User not found' }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Error update user' }),
            { status: 500 }
        );
    }
};
