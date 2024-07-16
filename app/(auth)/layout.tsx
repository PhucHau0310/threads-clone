import React from 'react';
import logoThreads from '../../public/img/threads.png';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative h-screen bg-black">
            <Image
                src={logoThreads}
                alt="logo threads"
                layout="fill"
                objectFit="cover"
                className="w-full h-auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
