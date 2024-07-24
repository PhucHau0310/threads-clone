'use client';

import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import React from 'react';

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

const Search = () => {
    const [valueSearch, setValueSearch] = React.useState<string>('');
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await fetch(`/api/user`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllUsers();
    }, []);

    const filteredUsers = React.useMemo(() => {
        if (!valueSearch) return users;
        return users.filter(
            (user) =>
                user.username
                    ?.toLowerCase()
                    .includes(valueSearch.toLowerCase()) ||
                user.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
                user?.bio?.toLowerCase().includes(valueSearch.toLowerCase())
        );
    }, [users, valueSearch]);

    return (
        <div className="bg-[#181818] rounded-3xl border border-[#2d2d2d]">
            <div className="w-full flex items-center justify-center my-8 relative">
                <div className="text-[#2d2d2d] absolute left-12 top-1/2 -translate-y-1/2">
                    <SearchIcon />
                </div>
                <input
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="bg-black placeholder:text-[#2d2d2d] outline-none w-[90%] py-3 border border-[#2d2d2d] text-white rounded-2xl p-2 pl-12"
                />
            </div>

            <div className="px-8">
                {filteredUsers.map((user, idx, arrUsers) => (
                    <div
                        key={user.id}
                        className={`mb-10 flex flex-row items-start gap-8 pb-8 ${
                            idx !== arrUsers.length - 1 &&
                            'border-b border-b-[#2d2d2d]'
                        }`}
                    >
                        <Image
                            src={user.profileImage}
                            alt="image"
                            width={45}
                            height={45}
                            className="rounded-full"
                        />

                        <div className="text-white">
                            <h1 className="font-semibold text-lg">
                                {user.username}
                            </h1>
                            <h2 className="font-medium text-base text-[#777777]">
                                {user.name}
                            </h2>

                            <p className="font-normal mt-2">{user?.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
