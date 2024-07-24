'use client';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react';
import Post from '../form/Post';
import { useUser } from '@clerk/nextjs';

const RightSideBar = () => {
    const [open, setOpen] = React.useState(false);
    const { user } = useUser();

    return (
        <div className="w-[29%]">
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <Post
                        open={open}
                        setOpen={setOpen}
                        avatar={user?.imageUrl}
                        username={user?.username}
                    />
                </div>
            )}

            <button
                onClick={() => setOpen(true)}
                className="hover:scale-110 transition-all fixed right-10 bottom-10 bg-[#181818] text-white font-semibold text-xl border border-[#393939] px-8 py-4 rounded-xl"
            >
                <AddOutlinedIcon />
            </button>
        </div>
    );
};

export default RightSideBar;
