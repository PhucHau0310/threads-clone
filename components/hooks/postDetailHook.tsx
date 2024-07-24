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
    postId: string;
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
    author: Author;
    imageCmt?: string;
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
}

const PostDetailHook = (postId: string) => {
    const [post, setPost] = React.useState<Post | null>(null);
    const [isLoading, setLoading] = React.useState(false);
    const { status, message } = useSelector(
        (state: {
            status: { status: number | null; message: string | null };
        }) => state.status
    );

    React.useEffect(() => {
        const getPost = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/post/${postId}`);

                if (!res.ok) {
                    throw new Error('Failed to get post');
                }

                const data = await res.json();
                setPost(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [postId, status]);
    return { post, isLoading };
};

export default PostDetailHook;
