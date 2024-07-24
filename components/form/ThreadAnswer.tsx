import Image from 'next/image';
import logo from '../../public/img/logo.jpg';
import React from 'react';
import thr from '../../public/img/threads.png';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '@/lib/firsebase';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import UserHooks from '../hooks/userHook';

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
    id: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    author: Author;
    likes: Like[];
    comments: Comment[];
    savedBy: Saved[];
}

const ThreadAnswer = ({
    userId,
    post,
    setOpenCmt,
}: {
    userId: string | null | undefined;
    post: Post | null;
    setOpenCmt: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = React.useState(0);
    const [renderImgFile, setRenderImgFile] = React.useState<string | null>(
        null
    );
    const [file, setFile] = React.useState<File | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [desc, setDesc] = React.useState<
        string | number | readonly string[] | undefined
    >();
    const { userData } = UserHooks(userId);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.clientHeight);
        }
    }, [post]);

    const handleUploadFile = (e: any) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setRenderImgFile(URL.createObjectURL(selectedFile));
    };

    const handlePost = async () => {
        try {
            let data = {};

            if (!file) {
                data = {
                    content: desc,
                    userId: userId,
                    postId: post?.id,
                };
            } else {
                const imgRef = ref(imageDb, `files/${v4()}`);
                const snapshot = await uploadBytes(imgRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                data = {
                    content: desc,
                    userId: userId,
                    postId: post?.id,
                    imageCmt: downloadURL,
                };
            }

            const res = await fetch(`/api/post/${post?.id}/cmt`, {
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
                        message: 'Comment Success',
                    })
                );
                setDesc(undefined);
                setRenderImgFile(null);
                setFile(null);
                setOpenCmt(false);
            } else {
                dispatch(
                    resStatus({
                        status: res.status,
                        message: dataRes.message,
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col w-[45%] h-[90%] gap-3 items-center">
            <div
                onClick={() => setOpenCmt(false)}
                className="cursor-pointer ml-auto hover:bg-gray-800 rounded-full p-1"
            >
                <CloseOutlinedIcon />
            </div>
            <h1 className="text-white font-semibold text-lg ">Thread Answer</h1>

            <div className="bg-[#181818] w-full h-full overflow-y-auto p-8 rounded-2xl border border-[#383939] shadow-lg text-black">
                <div
                    ref={contentRef}
                    className=" flex flex-row items-start gap-3 mb-4"
                >
                    <div className="flex flex-col items-center gap-5 justify-between">
                        <div className="relative">
                            <Image
                                src={post?.author.profileImage || logo}
                                alt="image"
                                width={45}
                                height={45}
                                className="rounded-full"
                            />
                        </div>
                        <div
                            className="w-[2px]  bg-[#777777]"
                            style={{ height: contentHeight - 30 }}
                        ></div>
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row items-center justify-between gap-2 mb-2">
                                <h2 className="font-semibold relative transition-all text-white">
                                    {post?.author.username}
                                </h2>
                                <p className="text-[#777777]">1 hour ago</p>
                            </div>
                        </div>

                        <h3 className="text-white">{post?.content}</h3>

                        <Image
                            width={150}
                            height={150}
                            src={post?.imageUrl || thr}
                            alt="image"
                            className="w-1/2 h-auto object-cover rounded-lg border border-white my-3"
                        />
                    </div>
                </div>

                <div className="bg-[#181818]">
                    <div className="flex flex-row items-start gap-3">
                        <Image
                            src={userData?.profileImage || logo}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />

                        <div className="w-full">
                            <h1 className="text-white">
                                {userData?.username || 'username'}
                            </h1>
                            <textarea
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={`Answer ${post?.author.username}...`}
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
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    <PermMediaOutlinedIcon
                                        sx={{ color: '#6c6c6c' }}
                                    />
                                </div>
                                <div className="cursor-pointer">
                                    <GifBoxOutlinedIcon
                                        sx={{ color: '#6c6c6c' }}
                                    />
                                </div>
                                <div className="cursor-pointer">
                                    <TagOutlinedIcon
                                        sx={{ color: '#6c6c6c' }}
                                    />
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
        </div>
    );
};

export default ThreadAnswer;
