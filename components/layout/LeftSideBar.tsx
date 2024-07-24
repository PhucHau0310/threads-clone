'use client';

import Image from 'next/image';
import logo from '../../public/img/logo.jpg';
import { pages } from '@/constants';
import { options } from '@/constants';
import React from 'react';
import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useClerk, useUser } from '@clerk/nextjs';

const LeftSideBar = () => {
    const [isHover, setHover] = React.useState<{
        hover: boolean;
        idx: number;
    }>({
        hover: false,
        idx: -1,
    });
    const [isActive, setActive] = React.useState<{
        active: boolean;
        idx: number;
    }>({
        active: true,
        idx: 0,
    });
    const [renderOptions, setRenderOptions] = React.useState(false);
    const [openInterface, setOpenInterface] = React.useState(false);

    const router = useRouter();
    const { signOut } = useClerk();
    const { user } = useUser();

    const handleClickMenu = (idx: number, page: string) => {
        setActive({ active: true, idx: idx });
        if (idx === 0) {
            router.push(`/`);
        } else if (idx === 3) {
            router.push(`/${page.toLocaleLowerCase()}/@${user?.username}`);
        } else {
            router.push(`/${page.toLocaleLowerCase()}`);
        }
    };

    const handleClickOptions = (title: string) => {
        if (title === 'Menu') {
            setRenderOptions(true);
        }
    };

    const handleClickInter = (item: string) => {
        if (item === 'Interface') {
            setOpenInterface(true);
            setRenderOptions(false);
        }

        if (item === 'Log Out') {
            signOut({ redirectUrl: '/sign-in' });
        }
    };

    return (
        <div className="w-[29%] fixed">
            <div className="w-[45%] h-screen text-[#4d4d4d] pl-3 pb-8 flex flex-col justify-between items-start">
                <Image
                    src={logo}
                    alt="logo"
                    width={70}
                    height={70}
                    className="hover:scale-110 cursor-pointer transition-transform"
                />
                <div className="flex flex-col gap-8 transition-transform">
                    {pages.map((page, idx) => (
                        <div
                            onClick={() => handleClickMenu(idx, page.title)}
                            key={idx}
                            className="flex flex-row gap-2 items-center p-3 cursor-pointer hover:bg-[#101010] hover:rounded-md"
                        >
                            {isActive.active && isActive.idx === idx ? (
                                <page.active
                                    sx={{
                                        color: 'white',
                                    }}
                                />
                            ) : (
                                <page.icon
                                    sx={{
                                        color: '#4d4d4d',
                                    }}
                                />
                            )}
                            <p
                                className={`${
                                    isActive.active && isActive.idx === idx
                                        ? 'text-white'
                                        : 'text-[#4d4d4d]'
                                }`}
                            >
                                {page.title}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col relative gap-2 transition-all">
                    {options.map((option, idx) => (
                        <div
                            onMouseOver={() =>
                                setHover({ hover: true, idx: idx })
                            }
                            onMouseOut={() =>
                                setHover({ hover: false, idx: -1 })
                            }
                            onClick={() => handleClickOptions(option.title)}
                            key={idx}
                            className={`${
                                isHover.idx === idx && isHover.hover
                                    ? 'text-white'
                                    : 'text-[#4d4d4d]'
                            } transition-colors duration-200 flex flex-row gap-2 items-center p-3 cursor-pointer`}
                        >
                            <option.icon />
                            <p className="font-medium">{option.title}</p>
                        </div>
                    ))}

                    {renderOptions && (
                        <div className="absolute animate-scale-up  bottom-0 p-2 w-60 bg-[#181818] border border-[#282828] rounded-lg">
                            <div
                                onClick={() => setRenderOptions(false)}
                                className="p-1  w-8 ml-auto mr-2 cursor-pointer rounded-full hover:bg-[#101010]"
                            >
                                <CloseIcon />
                            </div>
                            {[
                                'Interface',
                                'Settings',
                                'Report Issue',
                                'Log Out',
                            ].map((item, idx) => (
                                <div
                                    onClick={() => handleClickInter(item)}
                                    key={idx}
                                    className="text-white transition ease-in-out duration-300 p-3 mb-2 cursor-pointer hover:bg-[#101010] flex flex-row justify-between rounded-lg"
                                >
                                    {item}
                                    {item === 'Interface' && (
                                        <ChevronRightIcon />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {openInterface && (
                        <div className="absolute bottom-0 p-2 w-60 bg-[#181818] border border-[#282828] rounded-lg">
                            <div
                                className="flex flex-row items-center gap-14"
                                onClick={() => {
                                    setRenderOptions(true);
                                    setOpenInterface(false);
                                }}
                            >
                                <KeyboardBackspaceIcon
                                    sx={{ color: 'white', cursor: 'pointer' }}
                                />
                                <p className="text-white">Interface</p>
                            </div>
                            <div className="w-full mt-4">
                                <button className="bg-[#0a0a0a] w-1/2 px-4 py-2 border border-[#2e2e2e] rounded-lg">
                                    <WbSunnyOutlinedIcon />
                                </button>
                                <button className="bg-[#1e1e1e] w-1/2 px-4 py-2 border border-[#2e2e2e] rounded-lg">
                                    <DarkModeOutlinedIcon />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftSideBar;
