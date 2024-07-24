'use client';

import Image from 'next/image';
import logo from '../../public/img/logo.jpg';
import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Follows = ({
    setOpenFollows,
    openFollows,
    userData,
}: {
    setOpenFollows: React.Dispatch<React.SetStateAction<boolean>>;
    openFollows: boolean;
    userData: any;
}) => {
    const [tabs, setTabs] = React.useState('followers');
    console.log(userData);
    return (
        <div className="flex flex-col w-[45%] gap-3 items-center">
            <div
                onClick={() => setOpenFollows(false)}
                className="p-1 rounded-full hover:bg-slate-500 cursor-pointer ml-auto"
            >
                <CloseOutlinedIcon />
            </div>
            <div className="bg-[#181818] text-white w-full relative py-3 rounded-2xl border border-[#383939] shadow-lg">
                <div className="flex flex-row border-b border-b-[#383939]">
                    <button
                        onClick={() => setTabs('followers')}
                        className={`w-1/2 flex flex-col items-center justify-center ${
                            tabs === 'followers' && 'border-b border-b-white'
                        } pb-2 transition-transform`}
                    >
                        <p className="font-bold text-base">Followers</p>
                        <p className="text-sm">
                            {userData?.followedBy?.length}
                        </p>
                    </button>

                    <button
                        onClick={() => setTabs('followings')}
                        className={`w-1/2 flex flex-col items-center justify-center ${
                            tabs === 'followings' && 'border-b border-b-white'
                        } pb-2 transition-shadow`}
                    >
                        <p className="font-bold text-base">Followings</p>
                        <p className="text-sm">{userData?.following?.length}</p>
                    </button>
                </div>

                <div className="my-4">
                    {tabs === 'followers'
                        ? userData?.followedBy?.map(
                              (follow: any, idx: number, arr: any) => (
                                  <div
                                      key={idx}
                                      className={`flex flex-row items-center justify-between mb-5 pb-4 ${
                                          idx === arr.length - 1
                                              ? ''
                                              : 'border-b border-b-[#383939]'
                                      }`}
                                  >
                                      <div className="flex flex-row items-center gap-2 pl-4">
                                          <Image
                                              src={logo}
                                              alt="img"
                                              width={40}
                                              height={40}
                                              className="rounded-full"
                                          />

                                          <div>
                                              <h2>
                                                  {follow.follower?.username}
                                              </h2>
                                              <h2 className="text-[#777777]">
                                                  {follow.follower?.name}
                                              </h2>
                                          </div>
                                      </div>

                                      <button className="mr-5 border border-[#383939] px-4 py-1 rounded-xl">
                                          Follow
                                      </button>
                                  </div>
                              )
                          )
                        : userData?.following?.map(
                              (follow: any, idx: number, arr: any) => (
                                  <div
                                      key={idx}
                                      className={`flex flex-row items-center justify-between mb-5 pb-4 ${
                                          idx === arr.length - 1
                                              ? ''
                                              : 'border-b border-b-[#383939]'
                                      }`}
                                  >
                                      <div className="flex flex-row items-center gap-2 pl-4">
                                          <Image
                                              src={logo}
                                              alt="img"
                                              width={40}
                                              height={40}
                                              className="rounded-full"
                                          />

                                          <div>
                                              <h2>
                                                  {follow.following.username}
                                              </h2>
                                              <h2 className="text-[#777777]">
                                                  {follow.following.name}
                                              </h2>
                                          </div>
                                      </div>
                                  </div>
                              )
                          )}
                </div>
            </div>
        </div>
    );
};

export default Follows;
