'use client';

import LeftSideBar from '@/components/layout/LeftSideBar';
import MainContainer from '@/components/layout/MainContainer';
import RightSideBar from '@/components/layout/RigthSideBar';
import TopBar from '@/components/layout/TopBar';
import { resStatus } from '@/lib/redux/slices/statusSlice';
import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const { status, message } = useSelector(
        (state: {
            status: { status: number | null; message: string | null };
        }) => state.status
    );
    const dispatch = useDispatch();

    const [timeRemaining, setTimeRemaining] = React.useState(3);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (status) {
            setTimeRemaining(3); // Reset the timer to 3 seconds whenever there's a new status
            interval = setInterval(() => {
                setTimeRemaining((currentTime) => {
                    if (currentTime <= 1) {
                        dispatch(resStatus({ status: null, message: null }));
                        clearInterval(interval);
                        return 3;
                    }
                    return currentTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [status, dispatch]);
    return (
        <div className="flex flex-row bg-black">
            <LeftSideBar />
            <MainContainer>
                <TopBar />
                {children}
                {status && (
                    <div
                        onClick={() =>
                            dispatch(resStatus({ status: null, message: null }))
                        }
                        className="fixed w-[300px] top-5 right-3"
                    >
                        <p className="ml-auto mb-2 text-white bg-slate-500 w-7 h-7 flex items-center justify-center rounded-full p-2">
                            {timeRemaining}
                        </p>
                        <Alert
                            severity={`${status === 200 ? 'success' : 'error'}`}
                        >
                            <AlertTitle>
                                {status === 200 ? 'Success' : 'Error'}
                            </AlertTitle>
                            {message}
                        </Alert>
                    </div>
                )}
            </MainContainer>
            <RightSideBar />
        </div>
    );
};

export default RootLayout;
