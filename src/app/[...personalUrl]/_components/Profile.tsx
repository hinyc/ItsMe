import LoadingText from '@/common/components/LoadingText';
import { profileImage } from '@/common/constant/profieImage';
import userGlobalQuery from '@/query';
import Image from 'next/image';
import React from 'react';
import { BiLabel } from 'react-icons/bi';
import { FiLink } from 'react-icons/fi';
import { IoMdPhonePortrait } from 'react-icons/io';
import { LuMail } from 'react-icons/lu';

export default function Profile() {
  const { data: user, isLoading: isLoadingUser, isFetching } = userGlobalQuery.useUser();

  const isLoading = isLoadingUser || isFetching;

  return (
    <div className="flex w-full flex-col items-center justify-center py-8">
      <div className="mb-6 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-lg shadow-md">
        <Image
          width={152}
          height={152}
          src={
            user?.info.image ||
            profileImage.find((image) => image.name === 'placeholder_outline')!.url
          }
          alt="profile image"
          className="mb-2 h-[152px] w-[152px]"
        />
      </div>

      <div>
        <div className="flex h-7 items-center text-xl font-bold">
          <BiLabel className="mr-2" />
          <div className="h-7 w-56 text-center">
            {isLoading ? <LoadingText /> : user?.info.nickname}
          </div>
        </div>

        {user?.info.phone && (
          <div className="mt-1 flex items-center text-xl font-bold">
            <IoMdPhonePortrait className="mr-2" />
            <div className="h-7 w-56 text-center">
              {isLoading ? <LoadingText /> : user?.info.phone}
            </div>
          </div>
        )}
        <div className="mt-1 flex items-center text-xl font-bold">
          <LuMail className="mr-2" />
          <div className="h-7 w-56 text-center">
            {isLoading ? <LoadingText /> : user?.info.email}
          </div>
        </div>
        <div className="mt-1 flex items-center text-xl font-bold">
          <FiLink className="mr-2" />
          <div className="h-7 w-56 text-center">
            {isLoading ? <LoadingText /> : `its-me/${user?.info.personalUrl}`}
          </div>
        </div>
      </div>
    </div>
  );
}
