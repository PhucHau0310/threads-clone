'use client';

import { topMenu } from '@/constants';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const TopBar = () => {
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
        <div className="sticky top-0 z-10 bg-black text-white pb-2 pt-6 mb-3 flex flex-row justify-center gap-3">
            <h1 className="font-medium text-lg">{page}</h1>
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
        </div>
    );
};

export default TopBar;
