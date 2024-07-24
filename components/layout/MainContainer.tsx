import React from 'react';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="w-[42%] ml-auto">{children}</div>;
};

export default MainContainer;
