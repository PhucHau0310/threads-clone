'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import logo from '../../public/img/logo.jpg';
import thr from '../../public/img/threads.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React from 'react';
import Post from '@/components/form/Post';

export default function Home() {
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { user } = useUser();

    React.useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.clientHeight);
        }
    }, []);

    return (
        <div className="h-[1000px] bg-[#181818] rounded-3xl border border-[#2d2d2d]">
            {open && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
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
                        src={(user && user.imageUrl) || logo}
                        alt="image"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />

                    <h2
                        onClick={() => setOpen(true)}
                        className="text-[#777777]"
                    >
                        Start with thread...
                    </h2>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="hover:opacity-90 rounded-lg px-4 py-2 text-white border border-[#7777]"
                >
                    Post
                </button>
            </div>

            <div className="text-white p-8 flex flex-row items-start gap-3 border-b border-b-[#777777]">
                <div className="flex flex-col items-center gap-5 justify-between">
                    <div className="relative">
                        <Image
                            src={(user && user.imageUrl) || logo}
                            alt="image"
                            width={140}
                            height={140}
                            className="rounded-full"
                        />

                        <button className="hover:scale-105 transition-transform -right-[3px] bottom-0.5 absolute bg-white px-[6px] py-[0.5px] rounded-full text-black">
                            +
                        </button>
                    </div>
                    <div
                        className="w-[2px]  bg-[#777777]"
                        style={{ height: contentHeight - 50 }}
                    ></div>
                </div>

                <div ref={contentRef} className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2 mb-2">
                            <h2 className="font-semibold">hopzzz11</h2>
                            <p className="text-[#777777]">1 hour ago</p>
                        </div>
                        <MoreHorizIcon sx={{ color: '#777777' }} />
                    </div>

                    <h3>
                        Description Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Non, iste tenetur. Tempore illum velit
                        cumque explicabo modi suscipit, quas aspernatur optio
                        quisquam qui dolore? Ratione fuga voluptatem eum unde
                        maxime.
                    </h3>

                    <Image
                        src={thr}
                        alt="image"
                        className="w-full h-auto rounded-lg border border-white my-3"
                    />

                    <div className="flex flex-row items-center gap-4 mt-8">
                        <div className="flex flex-row gap-2 hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform">
                            <FavoriteBorderIcon />
                            <p>5,5K</p>
                        </div>
                        <div className="flex flex-row gap-2  hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform">
                            <ModeCommentOutlinedIcon />
                            <p>5,5K</p>
                        </div>
                        <div className="flex flex-row gap-2  hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform">
                            <LoopOutlinedIcon />
                            <p>5,5K</p>
                        </div>

                        <div className="-rotate-45  hover:bg-zinc-700 p-3 rounded-3xl cursor-pointer transition-transform">
                            <SendOutlinedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
