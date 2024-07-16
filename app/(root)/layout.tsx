import LeftSideBar from '@/components/layout/LeftSideBar';
import MainContainer from '@/components/layout/MainContainer';
import RightSideBar from '@/components/layout/RigthSideBar';
import TopBar from '@/components/layout/TopBar';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row bg-black">
            <LeftSideBar />
            <MainContainer>
                <TopBar />
                {children}
            </MainContainer>
            <RightSideBar />
        </div>
    );
};

export default RootLayout;
