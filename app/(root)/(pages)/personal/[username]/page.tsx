'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuth, UserButton, useUser } from '@clerk/nextjs';
import UpdateProfile from '@/components/form/UpdateProfile';
import UserHooks from '@/components/hooks/userHook';
import Follows from '@/components/form/Follows';
import Info from '@/components/form/Info';
import InstagramIcon from '@mui/icons-material/Instagram';
import { CircularProgress } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';

const Thread = ({ userData }: { userData: any }) => {
    return (
        <div>
            {userData?.posts?.map((post: any, idx: number) => (
                <div
                    key={idx}
                    className="px-8 py-4 border-b border-b-[#777777]"
                >
                    <div className="flex flex-row items-center">
                        <Image
                            src={userData.profileImage}
                            alt="avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />

                        <div className="ml-4 text-white">
                            <div className="flex flex-row items-center gap-2">
                                <h2 className="font-semibold">
                                    {post.author?.username}
                                </h2>
                                <h3 className="text-[#777777]">
                                    {post?.createdAt.slice(0, 10)}
                                </h3>
                            </div>
                            <h3>{post?.content}</h3>
                        </div>

                        <div className="text-[#777777] ml-auto">
                            <MoreHorizIcon />
                        </div>
                    </div>

                    <div className="ml-16 mt-2">
                        <Image
                            src={post?.imageUrl ?? ''}
                            alt="image cmt"
                            width={200}
                            height={60}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const Comment = ({
    userData,
    userId,
}: {
    userData: any;
    userId: string | undefined | null;
}) => {
    return (
        <div>
            {userData?.comments.map((cmt: any, idx: number) => (
                <div
                    key={idx}
                    className="px-8 py-4 border-b border-b-[#777777]"
                >
                    <div className="flex flex-row items-start gap-4">
                        <div
                            // onClick={() => setClickUser(true)}
                            className="relative"
                        >
                            <Image
                                src={cmt?.post?.author.profileImage}
                                alt="image"
                                width={50}
                                height={50}
                                className="rounded-full hover:cursor-pointer"
                            />

                            {userId !== cmt?.post?.author.id && (
                                <button className="hover:scale-105 transition-transform -right-[3px] bottom-0.5 absolute bg-white px-[6px] py-[0.5px] rounded-full text-black">
                                    +
                                </button>
                            )}
                        </div>

                        <div>
                            <div className="flex flex-row items-center gap-3">
                                <h1>{cmt?.post?.author.username}</h1>
                                <h2 className="text-[#777777]">
                                    {cmt?.post?.createdAt.slice(0, 10)}
                                </h2>
                            </div>
                            <h2>{cmt?.post?.content}</h2>
                        </div>

                        <div className="text-[#777777] ml-auto">
                            <MoreHorizIcon />
                        </div>
                    </div>

                    <div className="mt-2 flex justify-center items-center">
                        <ArrowDownwardIcon />
                    </div>

                    <div className="flex flex-row items-start gap-4 mt-8">
                        <div
                            // onClick={() => setClickUser(true)}
                            className="relative"
                        >
                            <Image
                                src={cmt?.author.profileImage}
                                alt="image"
                                width={50}
                                height={50}
                                className="rounded-full hover:cursor-pointer"
                            />
                        </div>

                        <div>
                            <div className="flex flex-row items-center gap-3">
                                <h1>{cmt?.author.username}</h1>
                                <h2 className="text-[#777777]">
                                    {cmt?.createdAt.slice(0, 10)}
                                </h2>
                            </div>
                            <h2>{cmt?.content}</h2>
                        </div>

                        <div className="text-[#777777] ml-auto">
                            <MoreHorizIcon />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const RePost = ({
    userData,
    userId,
}: {
    userData: any;
    userId: string | null | undefined;
}) => {
    return (
        <div>
            {userData?.savedPosts?.map((rePost: any, idx: number) => (
                <div
                    key={idx}
                    className="px-8 py-4 border-b border-b-[#777777]"
                >
                    <div className="flex flex-row items-start gap-4">
                        <div
                            // onClick={() => setClickUser(true)}
                            className="relative"
                        >
                            <Image
                                src={rePost?.post?.author.profileImage}
                                alt="image"
                                width={50}
                                height={50}
                                className="rounded-full hover:cursor-pointer"
                            />

                            {userId !== rePost?.post?.author.id && (
                                <button className="hover:scale-105 transition-transform -right-[3px] bottom-0.5 absolute bg-white px-[6px] py-[0.5px] rounded-full text-black">
                                    +
                                </button>
                            )}
                        </div>

                        <div>
                            <div>
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center gap-2">
                                        <h1>{rePost?.post?.author.username}</h1>
                                        <h2 className="text-[#777777]">
                                            {rePost?.post?.createdAt.slice(
                                                0,
                                                10
                                            )}
                                        </h2>
                                    </div>

                                    <div className="text-[#777777] ml-[200px]">
                                        <MoreHorizIcon />
                                    </div>
                                </div>
                                <h2>{rePost?.post?.content}</h2>
                                <div>
                                    <Image
                                        src={rePost?.post?.imageUrl}
                                        alt="image"
                                        width={200}
                                        height={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Personal = () => {
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openFollows, setOpenFollows] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);

    const pathname = usePathname().split('/')[2];
    const username = pathname.startsWith('@') ? pathname.slice(1) : pathname;
    const { userData, isLoading } = UserHooks(username);
    const { userId } = useAuth();

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('tag');
    const dispatch = useDispatch();

    const splitTextAndLink = (input: string): [string, string] => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const match = input.match(urlRegex);

        if (match) {
            const url = match[0];
            const text = input.replace(url, '').trim();
            return [text, url];
        }

        return [input, ''];
    };
    const [text, link] = splitTextAndLink(userData?.bio ?? '');

    const handleFollow = async (
        userId: string | null | undefined,
        followingId: string | undefined
    ) => {
        try {
            const data = {
                followerId: userId,
                followingId: followingId,
            };
            const res = await fetch(`/api/following/${followingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();

            if (res.ok) {
                dispatch(
                    resStatus({
                        status: res.status,
                        message: dataRes.message,
                    })
                );
            } else {
                dispatch(
                    resStatus({ status: res.status, message: dataRes.message })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(resStatus({ status: 500, message: 'Failed' }));
        }
    };

    return isLoading ? (
        <CircularProgress />
    ) : (
        <div className="bg-[#181818] rounded-3xl p-7 text-white">
            <div className="flex flex-row items-center justify-between">
                {openInfo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                        <Info
                            openInfo={openInfo}
                            setOpenInfo={setOpenInfo}
                            userData={userData}
                        />
                    </div>
                )}
                <div>
                    <h1
                        onClick={() => setOpenInfo(true)}
                        className=" font-semibold text-2xl cursor-pointer hover:underline mb-1"
                    >
                        {userData?.name}
                    </h1>
                    <h2 className=" font-normal text-sm">
                        {userData?.username}
                    </h2>
                </div>

                {userId === userData?.id ? (
                    <UserButton />
                ) : (
                    <div>
                        <Image
                            src={userData?.profileImage ?? ''}
                            alt="image"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </div>
                )}
            </div>

            <h3 className="mt-4">
                {text}
                <a
                    className="flex hover:underline text-blue-500"
                    href={`${link}`}
                    target="_blank"
                >
                    {link}
                </a>
            </h3>

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3">
                    {userId === userData?.id && (
                        <div className="flex flex-row">
                            {userData?.followedBy
                                .slice(0, 2)
                                .map((follow: any, idx: number) => (
                                    <div
                                        key={follow.follower?.id}
                                        className={`relative ${
                                            idx === 1 ? '-ml-2' : ''
                                        }`}
                                    >
                                        <Image
                                            src={
                                                follow?.follower
                                                    ?.profileImage ?? ''
                                            }
                                            alt={`Follower ${idx + 1}`}
                                            width={24}
                                            height={24}
                                            className="rounded-full border-2 border-white"
                                        />
                                    </div>
                                ))}

                            {(userData?.followedBy?.length ?? 0) > 2 && (
                                <div className="ml-1 flex items-center text-sm text-gray-500">
                                    +{userData?.followedBy?.length ?? 0 - 2}
                                </div>
                            )}
                        </div>
                    )}

                    {openFollows && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                            <Follows
                                setOpenFollows={setOpenFollows}
                                openFollows={openFollows}
                                userData={userData}
                            />
                        </div>
                    )}

                    <p
                        onClick={() => setOpenFollows(true)}
                        className="text-[#575757] cursor-pointer hover:underline transition-all"
                    >
                        {userData?.followedBy?.length} followers
                    </p>
                </div>

                <div className="p-2 cursor-pointer hover:bg-slate-500 rounded-full transition-all">
                    <InstagramIcon />
                </div>
            </div>

            {openUpdate && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <UpdateProfile
                        openUpdate={openUpdate}
                        setOpenUpdate={setOpenUpdate}
                        name={userData?.name}
                        username={userData?.username}
                        userData={userData}
                    />
                </div>
            )}

            {userId === userData?.id ? (
                <button
                    onClick={() => setOpenUpdate(true)}
                    className="border hover:scale-95 transition-transform border-[#2f3030] w-full rounded-lg mt-3 py-2"
                >
                    Edit Profile
                </button>
            ) : (
                <div className="flex flex-row gap-3">
                    {userData?.followedBy.some(
                        (follow) => follow.followerId === userId
                    ) ? (
                        <button
                            onClick={() => handleFollow(userId, userData?.id)}
                            className="border border-[#2f3030] hover:scale-95 transition-transform bg-transparent text-white font-medium w-full rounded-lg mt-3 py-2"
                        >
                            Followed
                        </button>
                    ) : (
                        <button
                            onClick={() => handleFollow(userId, userData?.id)}
                            className="border hover:scale-95 transition-transform bg-white text-black font-medium w-full rounded-lg mt-3 py-2"
                        >
                            Follow
                        </button>
                    )}
                    <button className="border hover:scale-95 transition-transform border-[#2f3030] w-full rounded-lg mt-3 py-2">
                        Mention
                    </button>
                </div>
            )}

            <div className="mt-8  border-b border-b-[#777777]">
                <button
                    onClick={() => router.push(`/personal/@${username}`)}
                    className={`w-1/3 pb-3 ${
                        search === null && 'border-b-2 border-white'
                    }`}
                >
                    Thread
                </button>
                <button
                    onClick={() =>
                        router.push(`/personal/@${username}/?tag=comments`)
                    }
                    className={`w-1/3 pb-3 text-[#777777] ${
                        search === 'comments' &&
                        'text-white border-b-2 border-white'
                    }`}
                >
                    Comments
                </button>
                <button
                    onClick={() =>
                        router.push(`/personal/@${username}/?tag=reposts`)
                    }
                    className={`w-1/3 pb-3 text-[#777777] ${
                        search === 'reposts' &&
                        'text-white border-b-2 border-white'
                    }`}
                >
                    Reposts
                </button>
            </div>

            {search === null && <Thread userData={userData} />}
            {search === 'comments' && (
                <Comment userData={userData} userId={userId} />
            )}
            {search === 'reposts' && (
                <RePost userData={userData} userId={userId} />
            )}
        </div>
    );
};

export default Personal;
