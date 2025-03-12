import { queryClient } from '@/app/Providers';
import useGlobalStore from '@/index';
import userGlobalQuery from '@/query';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const NAVIGATION_LINK = [
  {
    route: '/edit',
    name: 'Edit',
    type: 'link'
  },
  // {
  //   route: '/login',
  //   name: 'Login'
  // },
  // {
  //   route: '/pricing',
  //   name: 'Pricing'
  // },
  // {
  //   route: '/pricing/checkout',
  //   name: 'Checkout'
  // },
  {
    route: '/pricing/checkout',
    name: 'UPGRADE',
    type: 'link'
  },
  {
    route: '/pricing/checkout',
    name: '광고제거'
  },
  {
    action: () => {},
    name: '공유하기'
  },
  {
    action: () => {
      signOut();
      queryClient.removeQueries();
    },
    name: 'Logout'
  }
];

export default function HeaderMenu() {
  const { showMainNav, setShowMainNav } = useGlobalStore();

  const { data: user } = userGlobalQuery.useUser();

  const route = useRouter();
  //todo
  //메뉴가 나왓다 들어갔다 하는건 귀찬을수도
  //메우 단순한 페이진다 과한듯함 더 단순하게 해보자

  const _onNavClose = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowMainNav(false);
  };
  return (
    <>
      <div className="absolute right-0 top-10 z-10">
        <div
          className={`flex flex-col items-end justify-center overflow-hidden px-2 transition-all ${showMainNav ? 'h-[180px]' : 'h-0'} space-y-2 text-stone-500`}
        >
          <button
            className="logo"
            onClick={() => {
              route.push(user?.info.personalUrl ?? '/');
              setShowMainNav(false);
            }}
          >
            IT&apos;S ME
          </button>
          {NAVIGATION_LINK.map((item, index) => {
            return item.type === 'link' ? (
              <Link key={index} href={item?.route ?? '/'} onClick={() => setShowMainNav(false)}>
                {item.name}
              </Link>
            ) : (
              <button key={index} onClick={item.action}>
                {item.name}
              </button>
            );
          })}
        </div>
        {/* background */}
      </div>
      {showMainNav && (
        <div
          className="fixed left-0 top-0 z-0 h-screen w-screen bg-transparent"
          onClick={_onNavClose}
          // onTouchStart={_onNavClose}
        />
      )}
    </>
  );
}
