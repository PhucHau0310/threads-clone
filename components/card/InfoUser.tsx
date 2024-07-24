import Image from 'next/image';

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

const InfoUser = ({
    name,
    username,
    profileImage,
    bio,
    post,
}: {
    name: string | undefined | null;
    username: string | undefined | null;
    profileImage: string | undefined | null;
    bio: string | undefined | null;
    post: Post | null;
}) => {
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h2 className="font-bold text-lg">{name}</h2>
                    <h3 className="font-normal text-sm">{username}</h3>
                </div>

                <Image
                    src={profileImage ?? ''}
                    alt="image profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                />
            </div>

            <p className="font-normal text-base my-4">{bio || 'bio'}</p>
            <p className="text-[#777777] text-sm"> Followers</p>

            <button className="my-6 py-2 bg-white font-semibold rounded-xl w-full text-black">
                Follow
            </button>
        </>
    );
};

export default InfoUser;
