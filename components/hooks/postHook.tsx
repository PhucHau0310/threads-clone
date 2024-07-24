'use client';

import React from 'react';
import { useSelector } from 'react-redux';

interface Author {
    id: string;
    name: string;
    email: string;
    username: string;
    bio: string | null;
    profileImage: string;
}

interface Like {
    id: string;
    createdAt: string;
    userId: string | undefined | null;
    postId: string | undefined | null;
}

interface Saved {
    id: string;
    createdAt: string;
    userId: string | undefined | null;
    postId: string | undefined | null;
}

interface Comment {
    id: string;
    content: string;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: Author;
}

interface Follow {
    followerId: string | null | undefined;
    followingId: string | null | undefined;
    follower: Author;
    createdAt: string;
}

interface Post {
    id: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    author: Author;
    likes: Like[];
    comments: Comment[];
    savedBy: Saved[];
    followedBy: Follow[];
}

const PostHook = (): [
    Post[] | null,
    React.Dispatch<React.SetStateAction<Post[] | null>>,
    boolean
] => {
    const [posts, setPosts] = React.useState<Post[] | null>(null);
    const { status, message } = useSelector(
        (state: {
            status: { status: number | null; message: string | null };
        }) => state.status
    );
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/post`);

                if (!res.ok) {
                    throw new Error('Failed to get posts');
                }

                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [status]);
    return [posts, setPosts, isLoading];
};

export default PostHook;
