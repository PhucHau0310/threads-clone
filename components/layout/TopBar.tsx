'use client';

import React from 'react';
import { topMenu } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Home = () => {
    const [clickOptions, setClickOptions] = React.useState(false);
    const [page, setPage] = React.useState('For You');
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const handleNavigate = (route: string, title: string) => {
        setPage(title);
        setClickOptions(false);

        if (route === 'for you') {
            router.push('/');
        } else {
            router.push(`/${route}`);
        }
    };

    const handleClickOutside = (event: any) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setClickOptions(false);
        }
    };

    React.useEffect(() => {
        if (clickOptions) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clickOptions]);

    return (
        <>
            {/* <h1 className="font-medium text-base">{page}</h1> */}
            <h1 className="font-medium text-base">
                {!pathname.split('/')[1]
                    ? 'For You'
                    : `${pathname.split('/')[1]}`}
            </h1>
            <button
                ref={buttonRef}
                onClick={() => setClickOptions(!clickOptions)}
                className="bg-[#1c1c1c] p-[1px] rounded-full hover:scale-105 transition-transform border border-white"
            >
                <KeyboardArrowDownOutlinedIcon />
            </button>

            <div
                ref={dropdownRef}
                className={`${
                    clickOptions ? 'block' : 'hidden'
                } absolute top-16 left-1/2 -translate-x-1/2 transition-transform bg-black px-2 pt-3 w-56 rounded-xl border border-[#4d4d4d]`}
            >
                {topMenu.map((item, idx) => (
                    <div
                        onClick={() =>
                            handleNavigate(item.title.toLowerCase(), item.title)
                        }
                        className="flex flex-row items-center justify-between hover:bg-[#101010] cursor-pointer p-3 rounded-md mb-3"
                        key={idx}
                    >
                        <h2>{item.title}</h2>
                        {item.route === pathname && <CheckIcon />}
                    </div>
                ))}
            </div>
        </>
    );
};

const Personal = () => {
    const username = usePathname().split('/')[2].slice(1);
    const router = useRouter();
    return (
        <div className="flex flex-row items-center gap-10">
            <div
                onClick={() => router.push('/')}
                className="flex hover:scale-105 cursor-pointer flex-row items-center justify-center p-[3px] border border-white rounded-full bg-[#181818]"
            >
                <ArrowBackIcon
                    sx={{
                        width: '18px',
                        height: '18px',
                    }}
                />
            </div>
            <h1 className="font-medium text-lg">{username}</h1>
        </div>
    );
};

const Search = () => {
    return (
        <div className="flex flex-row items-center gap-10">
            <h1 className="font-medium text-lg">Search</h1>
        </div>
    );
};

const TopBar = () => {
    const pathname = usePathname().split('/')[1];
    return (
        <div className="sticky top-0 z-10 bg-black text-white pb-2 pt-6 mb-3 flex flex-row justify-center gap-3">
            {(pathname === '' ||
                pathname === 'following' ||
                pathname === 'liked' ||
                pathname === 'saved') && <Home />}
            {pathname === 'personal' && <Personal />}
            {pathname === 'search' && <Search />}
        </div>
    );
};

export default TopBar;
