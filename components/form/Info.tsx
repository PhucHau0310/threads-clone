import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface User {
    id: string;
    name: string;
    email: string;
    username?: string | null;
    password?: string;
    bio?: string;
    profileImage: string;
    createdAt: string;
}

const Info = ({
    setOpenInfo,
    openInfo,
    userData,
}: {
    setOpenInfo: React.Dispatch<React.SetStateAction<boolean>>;
    openInfo: boolean;
    userData: User | null;
}) => {
    return (
        <div className="flex flex-col w-[40%] gap-3 items-center">
            <div className="bg-[#181818]  text-white w-full relative p-8 rounded-2xl border border-[#383939] shadow-lg ">
                <div
                    onClick={() => setOpenInfo(false)}
                    className="absolute right-3 top-2 transition-all hover:bg-slate-500 p-1 rounded-full cursor-pointer"
                >
                    <CloseOutlinedIcon />
                </div>
                <div className="border-b border-b-[#323333] pb-4">
                    <h1 className="text-base mb-1">Name</h1>
                    <div className="flex flex-row items-center gap-1">
                        <h2 className="text-sm">{userData?.name}</h2>
                        <p className="text-sm">(@{userData?.username})</p>
                    </div>
                </div>
                <div className="border-b border-b-[#323333] pb-4 mt-4">
                    <h1 className="text-base mb-1">Joining Date</h1>
                    <div className="flex flex-row items-center gap-1">
                        <h2 className="text-sm">
                            {userData?.createdAt.slice(0, 10)}
                        </h2>
                        <p className="text-sm">{'.'} 100 million +</p>
                    </div>
                </div>
                <div className="pb-4 mt-4">
                    <h1 className="text-base mb-1">Old Username</h1>
                    <div className="flex flex-row items-center gap-1">
                        {/* <h2 className="text-sm">ahihi</h2> */}
                        <p className="text-sm">changed 3 times on Threads</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
