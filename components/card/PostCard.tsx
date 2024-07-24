'use client';

import thr from '../../public/img/threads.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import logo from '../../public/img/logo.jpg';
import ThreadAnswer from '../form/ThreadAnswer';
import { CloseOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import InfoUser from './InfoUser';
import { setPostDetail } from '@/lib/redux/slices/postDetailSlice';

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
    following: Author;
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
    following: Follow[];
}

const PostCard = ({
    post,
    posts,
    setPosts,
    idx,
}: {
    idx: number | null;
    post: Post | null;
    posts: Post[] | null;
    setPosts: React.Dispatch<React.SetStateAction<Post[] | null>> | any;
}) => {
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = React.useState(0);
    const [isHoverUsername, setHoverUsername] = React.useState(false);
    const [idxUserHovered, setIdxUserHovered] = React.useState(-1);
    const [isClickUser, setClickUser] = React.useState(false);
    const [openCmt, setOpenCmt] = React.useState(false);

    const { userId } = useAuth();
    const dispatch = useDispatch();
    const router = useRouter();

    React.useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.clientHeight);
        }
    }, [post]);

    const handleLikePost = async (postId: string | undefined) => {
        if (!posts) return;

        const postIndex = posts?.findIndex((post) => post.id === postId);
        if (postIndex === -1 || postIndex === undefined) return;

        const isLiked = posts[postIndex].likes.some(
            (like) => like.userId === userId
        );

        const data = { userId, postId };

        try {
            const res = await fetch(`/api/post/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();
            if (res.ok) {
                const updatedPosts = [...posts];
                if (isLiked) {
                    updatedPosts[postIndex].likes = updatedPosts[
                        postIndex
                    ].likes.filter((like: any) => like.userId !== userId);
                } else {
                    updatedPosts[postIndex].likes.push({
                        userId,
                        postId,
                        id: dataRes.id,
                        createdAt: dataRes.createdAt,
                    });
                }
                setPosts(updatedPosts);

                dispatch(
                    resStatus({
                        status: res.status,
                        message: isLiked ? 'Post unliked' : 'Post liked',
                    })
                );
            } else {
                dispatch(
                    resStatus({ status: res.status, message: dataRes.message })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(resStatus({ status: 500, message: 'An error occurred' }));
        }
    };

    const handleCommentPost = async (postId: string | undefined) => {
        setOpenCmt(true);
    };

    const handleRePosts = async (postId: string | undefined) => {
        if (!posts) return;

        const postIndex = posts?.findIndex((post) => post.id === postId);
        if (postIndex === -1 || postIndex === undefined) return;

        const isRePost = posts[postIndex].savedBy.some(
            (rePost) => rePost.userId === userId
        );

        const data = { userId, postId };

        try {
            const res = await fetch(`/api/post/${postId}/repost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();
            if (res.ok) {
                const updatedPosts = [...posts];
                if (isRePost) {
                    updatedPosts[postIndex].savedBy = updatedPosts[
                        postIndex
                    ].savedBy.filter((rePost: any) => rePost.userId !== userId);
                } else {
                    updatedPosts[postIndex].savedBy.push({
                        userId,
                        postId,
                        id: dataRes.id,
                        createdAt: dataRes.createdAt,
                    });
                }
                setPosts(updatedPosts);

                dispatch(
                    resStatus({
                        status: res.status,
                        message: isRePost ? 'Unsaved post' : 'Saved post',
                    })
                );
            } else {
                dispatch(
                    resStatus({ status: res.status, message: dataRes.message })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(resStatus({ status: 500, message: 'An error occurred' }));
        }
    };

    const handleNavigateDetail = () => {
        if (post) {
            dispatch(setPostDetail(post));
        }
        router.push(`/personal/@${post?.author.username}/post/${post?.id}`);
    };

    return (
        <div className="text-white p-8 flex flex-row items-start gap-3 border-b border-b-[#777777]">
            <div className="flex flex-col items-center gap-5 justify-between">
                <div onClick={() => setClickUser(true)} className="relative">
                    <Image
                        src={post?.author?.profileImage || logo}
                        alt="image"
                        width={50}
                        height={50}
                        className="rounded-full hover:cursor-pointer"
                    />

                    {userId !== post?.author?.id && (
                        <button className="hover:scale-105 transition-transform -right-[3px] bottom-0.5 absolute bg-white px-[6px] py-[0.5px] rounded-full text-black">
                            +
                        </button>
                    )}
                </div>

                {isClickUser && (
                    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
                        <div className="text-white flex flex-col w-[25%] gap-1 items-end ">
                            <button
                                className="hover:bg-zinc-800 p-1 mb-2 rounded-full"
                                onClick={() => setClickUser(false)}
                            >
                                <CloseOutlined />
                            </button>
                            <div className="bg-[#181818] w-full relative p-8 rounded-2xl border border-[#383939] shadow-lg ">
                                <InfoUser
                                    name={post?.author?.name}
                                    username={post?.author?.username}
                                    profileImage={post?.author?.profileImage}
                                    bio={post?.author?.bio}
                                    post={post}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className="w-[2px]  bg-[#777777]"
                    style={{ height: contentHeight - 50 }}
                ></div>
            </div>

            <div ref={contentRef} className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center justify-between gap-2 mb-2">
                        <h2
                            onClick={() =>
                                router.push(
                                    `/personal/@${post?.author?.username}`
                                )
                            }
                            onMouseEnter={() => {
                                setIdxUserHovered(idx ?? 0);
                                setTimeout(() => {
                                    setHoverUsername(true);
                                }, 300);
                            }}
                            onMouseLeave={() => setHoverUsername(false)}
                            className={`font-semibold relative cursor-pointer ${
                                isHoverUsername &&
                                idxUserHovered === idx &&
                                'underline'
                            }`}
                        >
                            {post?.author?.username}

                            {isHoverUsername &&
                                idxUserHovered === idx &&
                                userId !== post?.author?.id && (
                                    <div className="bg-[#181818] bg-opacity-95 absolute mt-[2px] w-[300px] transition-all rounded-lg border px-5 pt-2 border-white">
                                        <InfoUser
                                            name={post?.author?.name}
                                            username={post?.author?.username}
                                            profileImage={
                                                post?.author?.profileImage
                                            }
                                            bio={post?.author?.bio}
                                            post={post}
                                        />
                                    </div>
                                )}
                        </h2>
                        <p className="text-[#777777]">
                            {post?.createdAt.slice(0, 10)}
                        </p>
                    </div>
                    <MoreHorizIcon sx={{ color: '#777777' }} />
                </div>

                <h3 className="">{post?.content}</h3>

                <Image
                    onClick={handleNavigateDetail}
                    width={150}
                    height={150}
                    src={post?.imageUrl || thr}
                    alt="image"
                    className="w-1/2 cursor-pointer h-auto object-cover rounded-lg border border-white my-3"
                />

                <div className="flex flex-row items-center gap-4 mt-8">
                    <div
                        onClick={() => handleLikePost(post?.id)}
                        className="flex hover:scale-95 flex-row gap-2 hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform"
                    >
                        {post?.likes?.some((like) => like.userId === userId) ? (
                            <>
                                <FavoriteIcon sx={{ color: 'red' }} />
                                <p className="text-red-500">
                                    {post?.likes?.length}
                                </p>
                            </>
                        ) : (
                            <>
                                <FavoriteBorderIcon />
                                <p>{post?.likes?.length}</p>
                            </>
                        )}
                    </div>
                    <div
                        onClick={() => handleCommentPost(post?.id)}
                        className="flex hover:scale-95 flex-row gap-2  hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform"
                    >
                        <ModeCommentOutlinedIcon />
                        <p>{post?.comments?.length}</p>
                    </div>
                    {openCmt && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                            <ThreadAnswer
                                setOpenCmt={setOpenCmt}
                                userId={userId}
                                post={post}
                            />
                        </div>
                    )}
                    <div
                        onClick={() => handleRePosts(post?.id)}
                        className="flex hover:scale-95 flex-row gap-2  hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform"
                    >
                        {post?.savedBy?.some(
                            (rePost) => rePost.userId === userId
                        ) ? (
                            <>
                                <LoopOutlinedIcon sx={{ color: 'yellow' }} />
                                <p className="text-yellow-300">
                                    {post?.savedBy?.length}
                                </p>
                            </>
                        ) : (
                            <>
                                <LoopOutlinedIcon />
                                <p>{post?.savedBy?.length}</p>
                            </>
                        )}
                    </div>

                    <div className="-rotate-45 hover:scale-95 hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform">
                        <SendOutlinedIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
