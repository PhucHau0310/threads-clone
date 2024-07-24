'use client';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resStatus } from '@/lib/redux/slices/statusSlice';

const UpdateProfile = ({
    openUpdate,
    setOpenUpdate,
    username,
    name,
    userData,
}: {
    openUpdate: boolean;
    setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    username: string | undefined | null;
    name: string | undefined;
    userData: any;
}) => {
    const [bio, setBio] = React.useState<string | null>(null);
    const [link, setLink] = React.useState<string | null>(null);

    const dispatch = useDispatch();

    const handleUpdateProfile = async () => {
        const data = {
            bio: `${bio} ${link}`,
        };
        try {
            const res = await fetch(`/api/user/${userData?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataRes = await res.json();

            if (res.ok) {
                setBio(null);
                setLink(null);
                setOpenUpdate(false);
                dispatch(
                    resStatus({ status: res.status, message: dataRes.message })
                );
            } else {
                dispatch(
                    resStatus({ status: res.status, message: dataRes.message })
                );
            }
        } catch (error) {
            console.log(error);
            dispatch(resStatus({ status: 500, message: 'Failed to update' }));
        }
    };
    return (
        <div className="flex flex-col w-[40%] gap-3 items-center">
            <div className="bg-[#181818]  text-white w-full relative p-8 rounded-2xl border border-[#383939] shadow-lg ">
                <div
                    onClick={() => setOpenUpdate(false)}
                    className="absolute right-3 top-2 transition-all hover:bg-slate-500 p-1 rounded-full cursor-pointer"
                >
                    <CloseOutlinedIcon />
                </div>
                <div className="border-b border-b-[#323333] pb-4">
                    <h1 className="text-base mb-1">Name</h1>
                    <div className="flex flex-row items-center gap-1">
                        <LockOutlinedIcon fontSize="small" />
                        <h2 className="text-sm">{name}</h2>
                        <p className="text-sm">(@{username})</p>
                    </div>
                </div>
                <div className="border-b border-b-[#323333] pb-4 mt-4">
                    <h1 className="text-base mb-1">Bio</h1>
                    <div className="flex flex-row items-center gap-2">
                        <div className="text-[#777777]">+</div>
                        <input
                            value={bio ?? ''}
                            onChange={(e) => setBio(e.target.value)}
                            type="text"
                            placeholder="Write Bio..."
                            className="text-[#777777] w-full bg-transparent outline-none"
                        />
                    </div>
                </div>
                <div className="border-b border-b-[#323333] pb-4 mt-4">
                    <h1 className="text-base mb-1">Links</h1>
                    <div className="flex flex-row items-center gap-2">
                        <div className="text-[#777777]">+</div>
                        <input
                            value={link ?? ''}
                            onChange={(e) => setLink(e.target.value)}
                            type="text"
                            placeholder="https://www.example.com/"
                            className="text-[#777777] w-full bg-transparent outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={handleUpdateProfile}
                    className="bg-white rounded-xl text-black w-full mt-5 py-2 font-medium"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default UpdateProfile;
