import Image from 'next/image';
import React from 'react';
import { IoMdPhonePortrait } from 'react-icons/io';
import { LuMail } from 'react-icons/lu';

export default function Profile() {
  const userInfo = {
    nickname: 'nickname',
    image: '/placeholder.png',
    phone: '010-1234-5678',
    email: 'email@gmail.com'
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-8">
      <Image
        width={150}
        height={150}
        src={userInfo.image}
        alt="profile image"
        className="mb-2 h-[150px] w-[150px] rounded-lg bg-gray-400"
      ></Image>
      <div className="text-xl font-bold">{userInfo.nickname}</div>
      <div className="flex items-center text-xl font-bold">
        <IoMdPhonePortrait className="mr-2" />
        {userInfo.phone}
      </div>
      <div className="flex items-center text-xl font-bold">
        <LuMail className="mr-2" />
        {userInfo.email}
      </div>
    </div>
  );
}
