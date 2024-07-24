'use client';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from 'next/image';
import logo from '../../public/img/logo.jpg';
import React from 'react';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '../../lib/firsebase';
import { v4 } from 'uuid';
import { useAuth } from '@clerk/nextjs';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';

const Post = ({
    open,
    setOpen,
    avatar,
    username,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    avatar: string | undefined;
    username: string | undefined | null;
}) => {
    const [renderImgFile, setRenderImgFile] = React.useState<string | null>(
        null
    );
    const [file, setFile] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [desc, setDesc] = React.useState<
        string | number | readonly string[] | undefined
    >();
    const [tags, setTags] = React.useState<string[]>([]);
    const { userId } = useAuth();
    const [isLoading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleUploadFile = (e: any) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setRenderImgFile(URL.createObjectURL(selectedFile));
    };

    const handlePost = async () => {
        if (!file) return;

        try {
            setLoading(true);
            // Upload file to Firebase Storage
            const imgRef = ref(imageDb, `files/${v4()}`);
            const snapshot = await uploadBytes(imgRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            let arrHashTags = desc
                ?.toString()
                .split(' ')
                .filter((item) => item.includes('#'));

            let description = desc
                ?.toString()
                .split(' ')
                .filter((item) => !item.includes('#'))
                .join(' ');
            console.log({ arrHashTags, description });

            const data = {
                content: description,
                imageUrl: downloadURL,
                authorId: userId,
                hashtags: tags,
            };

            const res = await fetch(`/api/post/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();

            if (res.ok) {
                dispatch(
                    resStatus({ status: res.status, message: 'Post Success' })
                );
                setDesc(undefined);
                setRenderImgFile(null);
                setFile(null);
                setOpen(false);
            } else {
                dispatch(
                    resStatus({ status: res.status, message: dataRes.message })
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-1/3 gap-3 items-center ">
            <div className="flex flex-row items-center gap-4">
                <h1 className="text-white font-semibold text-lg">New Thread</h1>
                {isLoading && <CircularProgress />}
            </div>
            <div className="bg-[#181818] w-full relative p-8 rounded-2xl border border-[#383939] shadow-lg text-black">
                <div
                    onClick={() => setOpen(false)}
                    className="absolute right-2 top-2 cursor-pointer hover:bg-gray-500 hover:rounded-full hover:transition-transform"
                >
                    <CloseOutlinedIcon sx={{ color: 'white' }} />
                </div>

                <div className="flex flex-row items-start gap-3">
                    <Image
                        src={avatar || logo}
                        alt="image"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />

                    <div className="w-full">
                        <h1 className="text-white">{username || 'username'}</h1>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Start with thread..."
                            className="h-8 overflow-y-hidden placeholder:text-[#6c6c6c] w-full text-[#6c6c6c] bg-transparent outline-none"
                        />

                        {renderImgFile && (
                            <div className="relative">
                                <Image
                                    src={renderImgFile ?? ''}
                                    alt="image"
                                    width={150}
                                    height={100}
                                    className="mt-2"
                                ></Image>

                                <div
                                    onClick={() => {
                                        setRenderImgFile(null);
                                        setFile(null);
                                    }}
                                    className="absolute left-2 top-2 cursor-pointer p-0.5 hover:bg-gray-500 rounded-full"
                                >
                                    <CloseOutlinedIcon
                                        sx={{
                                            color: 'white',
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleUploadFile}
                            className="hidden"
                        />

                        <div className="flex flex-row mt-3 gap-4">
                            <div
                                className="cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <PermMediaOutlinedIcon
                                    sx={{ color: '#6c6c6c' }}
                                />
                            </div>
                            <div className="cursor-pointer">
                                <GifBoxOutlinedIcon sx={{ color: '#6c6c6c' }} />
                            </div>
                            <div className="cursor-pointer">
                                <TagOutlinedIcon sx={{ color: '#6c6c6c' }} />
                            </div>
                        </div>

                        <h2 className="text-[#6c6c6c] cursor-not-allowed mt-4">
                            Add Thread
                        </h2>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-center mt-10">
                    <h3 className="text-[#6c6c6c]">
                        Everyone can to reply and quote
                    </h3>

                    <button
                        onClick={handlePost}
                        className={`${
                            !desc
                                ? 'cursor-not-allowed text-[#6c6c6c]  border-[#6c6c6c]'
                                : 'cursor-pointer text-white  border-white'
                        }  px-4 py-2 rounded-lg border`}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
