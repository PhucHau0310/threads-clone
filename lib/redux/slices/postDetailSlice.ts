import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface Post {
    id: string | null;
    content: string | null;
    imageUrl: string | null;
    createdAt: string | null;
    author: Author | null;
    likes: Like[] | null;
    comments: Comment[] | null;
    savedBy: Saved[] | null;
}

const initialState: Post = {
    id: null,
    content: null,
    imageUrl: null,
    createdAt: null,
    author: null,
    likes: null,
    comments: null,
    savedBy: null,
};

const postSlice = createSlice({
    name: 'postDetail',
    initialState: initialState,
    reducers: {
        setPostDetail: (state, action: PayloadAction<Post>) => {
            return action.payload;
        },
    },
});

export const { setPostDetail } = postSlice.actions;
export default postSlice.reducer;
