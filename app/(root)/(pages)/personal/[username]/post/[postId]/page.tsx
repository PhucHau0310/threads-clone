'use client';

import PostCard from '@/components/card/PostCard';
import PostDetailHook from '@/components/hooks/postDetailHook';
import PostHook from '@/components/hooks/postHook';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const PostDetail = () => {
    const postId = usePathname().split('/')[4];
    const [posts, setPosts] = PostHook();
    const { post } = PostDetailHook(postId);

    return (
        <div className="bg-[#181818] rounded-3xl border border-[#2d2d2d] mb-10">
            <PostCard
                idx={null}
                post={post as any}
                posts={posts as any}
                setPosts={setPosts}
            />

            <div className="text-white p-8 flex flex-row items-center justify-between border-b border-b-[#777777]">
                <h1>Thread Answer</h1>
                <button className="flex flex-row text-[#777777]">
                    See Actions
                    <div>
                        <ChevronRightIcon />
                    </div>
                </button>
            </div>

            <div>
                {post?.comments?.map((cmt, idx) => (
                    <div
                        key={idx}
                        className="px-8 py-4 border-b border-b-[#777777]"
                    >
                        <div className="flex flex-row items-center">
                            <Image
                                src={cmt.author.profileImage}
                                alt="avatar"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />

                            <div className="ml-4 text-white">
                                <div className="flex flex-row items-center gap-2">
                                    <h2 className="font-semibold">
                                        {cmt.author.username}
                                    </h2>
                                    <h3 className="text-[#777777]">
                                        {cmt.createdAt.slice(0, 10)}
                                    </h3>
                                </div>
                                <h3>{cmt.content}</h3>
                            </div>

                            <div className="text-[#777777] ml-auto">
                                <MoreHorizIcon />
                            </div>
                        </div>

                        {cmt.imageCmt && (
                            <div className="ml-16 mt-2">
                                <Image
                                    src={cmt.imageCmt ?? ''}
                                    alt="image cmt"
                                    width={200}
                                    height={60}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
