'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import logo from '../../public/img/logo.jpg';
import React from 'react';
import Post from '@/components/form/Post';
import { useRouter } from 'next/navigation';
import PostHook from '@/components/hooks/postHook';
import PostCard from '@/components/card/PostCard';
import { CircularProgress } from '@mui/material';
export default function Home() {
    const [open, setOpen] = React.useState(false);
    const { user } = useUser();
    const router = useRouter();
    const [posts, setPosts, isLoading] = PostHook();

    return (
        <div className="bg-[#181818] rounded-3xl border border-[#2d2d2d]">
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
                    <Post
                        open={open}
                        setOpen={setOpen}
                        avatar={user?.imageUrl}
                        username={user?.username}
                    />
                </div>
            )}

            <div className="flex flex-row items-center justify-between p-8 border-b border-b-[#777777]">
                <div className="flex flex-row gap-4 items-center">
                    <Image
                        onClick={() =>
                            router.push(`/personal/@${user?.username}`)
                        }
                        src={(user && user.imageUrl) || logo}
                        alt="image"
                        width={50}
                        height={50}
                        className="rounded-full hover:cursor-pointer transition-transform duration-200 hover:scale-105"
                    />

                    <h2
                        onClick={() => setOpen(true)}
                        className="text-[#777777] transition-all duration-200 hover:text-white hover:cursor-pointer"
                    >
                        Start with thread...
                    </h2>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="transition-colors duration-200 hover:opacity-90 rounded-lg px-4 py-2 text-white border border-[#7777]"
                >
                    Post
                </button>
            </div>

            {isLoading ? (
                <div className="flex mx-auto w-10 h-10 my-6">
                    <CircularProgress />
                </div>
            ) : (
                posts?.map((post, idx) => (
                    <PostCard
                        key={idx}
                        idx={idx}
                        post={post as any}
                        posts={posts as any}
                        setPosts={setPosts}
                    />
                ))
            )}
        </div>
    );
}
