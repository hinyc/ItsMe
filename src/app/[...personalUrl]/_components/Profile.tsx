import { profileImage } from '@/common/constant/profieImage';
import userGlobalQuery from '@/query';
import Image from 'next/image';
import React from 'react';
import { FiLink } from 'react-icons/fi';
import { IoMdPhonePortrait } from 'react-icons/io';
import { LuMail } from 'react-icons/lu';

export default function Profile() {
  const { data: user } = userGlobalQuery.useUser();

  console.log(user?.info);

  return (
    <div className="flex w-full flex-col items-center justify-center py-8">
      <Image
        width={150}
        height={150}
        src={
          user?.info.image ||
          profileImage.find((image) => image.name === 'placeholder_outline')!.url
        }
        alt="profile image"
        className="mb-2 h-[150px] w-[150px] rounded-lg border-[1px] border-[#cdcfd6] bg-gray-400"
      ></Image>
      <div className="text-xl font-bold">{user?.info.nickname}</div>

      {user?.info.phone && (
        <div className="flex items-center text-xl font-bold">
          <IoMdPhonePortrait className="mr-2" />
          {user?.info.phone}
        </div>
      )}
      <div className="flex items-center text-xl font-bold">
        <LuMail className="mr-2" />
        {user?.info.email}
      </div>
      <div className="flex items-center text-xl font-bold">
        <FiLink className="mr-2" />
        its-me/{user?.info.personalUrl}
      </div>
    </div>
  );
}
