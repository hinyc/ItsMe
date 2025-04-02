import LoadingText from '@/common/components/LoadingText';
import { profileImage } from '@/common/constant/profieImage';
import userGlobalQuery from '@/common/query';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { BiLabel } from 'react-icons/bi';
import { FiLink } from 'react-icons/fi';
import { IoMdPhonePortrait } from 'react-icons/io';
import { LuMail } from 'react-icons/lu';
import useMeStore from '../_store';

export default function Profile() {
  const { data: user, isLoading: isLoadingUser, isFetching } = userGlobalQuery.useUser();
  const {
    edit,
    nickname,
    email,
    image,
    phone,
    personalUrl,
    links,
    setEdit,
    setNickname,
    setEmail,
    setPersonalUrl,
    setPhone
  } = useMeStore();

  const isLoading = isLoadingUser || isFetching;

  useEffect(() => {
    if (user) {
      useMeStore.setState({
        edit: false,
        nickname: user.nickname,
        email: user.email,
        image: user.image ?? '',
        phone: user.phone ?? '',
        personalUrl: user.personalUrl ?? '',
        links: user.links
      });
    }
  }, [user]);
  return (
    <div className="flex w-full flex-col items-center justify-center py-8">
      <div className="mb-6 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-lg shadow-md">
        <Image
          width={152}
          height={152}
          src={
            user?.image || profileImage.find((image) => image.name === 'placeholder_outline')!.url
          }
          alt="profile image"
          className="mb-2 h-[152px] w-[152px]"
        />
      </div>

      <div>
        <div className="flex h-7 items-center text-xl font-bold">
          <BiLabel className="mr-2" />
          <div className="mb-1 h-7 w-56">
            {isLoading ? (
              <LoadingText />
            ) : (
              <input
                className="h-full w-full border-b-2 border-me-main text-center"
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
              />
            )}
          </div>
        </div>

        {user?.phone && (
          <div className="mt-1 flex items-center text-xl font-bold">
            <IoMdPhonePortrait className="mr-2" />
            <div className="mb-1 h-7 w-56">
              {isLoading ? (
                <LoadingText />
              ) : (
                <input
                  className="h-full w-full border-b-2 border-me-main text-center"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              )}
            </div>
          </div>
        )}
        <div className="mt-1 flex items-center text-xl font-bold">
          <LuMail className="mr-2" />
          <div className="mb-1 h-7 w-56">
            {isLoading ? (
              <LoadingText />
            ) : (
              <input
                className="h-full w-full border-b-2 border-me-main text-center"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            )}
          </div>
        </div>
        <div className="mt-1 flex items-center text-xl font-bold">
          <FiLink className="mr-2" />
          <div className="mb-1 h-7 w-56">
            {isLoading ? (
              <LoadingText />
            ) : (
              <input
                className="h-full w-full border-b-2 border-me-main text-center"
                onChange={(e) => setPersonalUrl(e.target.value.slice(1))}
                value={'/' + personalUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
