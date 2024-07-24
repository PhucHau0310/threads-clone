'use client';

import React from 'react';
import { useSelector } from 'react-redux';

interface Like {
    id: string;
    createdAt: string;
    userId: string | undefined | null;
    postId: string | undefined | null;
}

interface Saved {
    id: string;
    createdAt: string;
    userId: string;
    postId: string;
}

interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: User;
    post: Post;
}

interface Post {
    id: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    author: User;
    likes: Like[];
    comments: Comment[];
    savedBy: Saved[];
}

interface Follow {
    followerId: string | null | undefined;
    followingId: string | null | undefined;
    follower: User;
    following: User;
    createdAt: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    username?: string | null;
    password?: string;
    bio?: string;
    profileImage: string;
    createdAt: string;
    posts: Post[];
    comments: Comment;
    followedBy: Follow[];
    following: Follow[];
}

const UserHooks = (identifier: string | null | undefined) => {
    const [userData, setUserData] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const { status, message } = useSelector(
        (state: {
            status: { status: number | null; message: string | null };
        }) => state.status
    );

    React.useEffect(() => {
        if (!identifier) {
            setError('No identifier provided');
            return;
        }

        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/user/${identifier}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error(error);
                setError(
                    error instanceof Error
                        ? error.message
                        : 'An unknown error occurred'
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [identifier, status]);

    return { userData, isLoading, error };
};

export default UserHooks;
