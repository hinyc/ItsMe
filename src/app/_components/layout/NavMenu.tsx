import useGlobalStore from '@/common/store/useGlobalState';
import Link from 'next/link';
import React from 'react';

const NAVIGATION_LINK = [
  {
    route: '/',
    name: "It's Me"
  },
  {
    route: '/edit',
    name: 'Edit'
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
    name: 'UPGRADE'
  },
  {
    route: '/pricing/checkout',
    name: '광고제거'
  }
];

export default function NavMenu() {
  const { showMainNav, setShowMainNavToggle } = useGlobalStore();
  //todo
  //메뉴가 나왓다 들어갔다 하는건 귀찬을수도
  //메우 단순한 페이진다 과한듯함 더 단순하게 해보자
  return (
    <>
      <div className="absolute right-0 top-10 z-10">
        {' '}
        <div
          className={`flex flex-col items-end justify-center overflow-hidden px-2 transition-all ${showMainNav ? 'h-[180px]' : 'h-0'} space-y-2 text-stone-500`}
        >
          {NAVIGATION_LINK.map((item, index) => (
            <Link key={index} href={item.route} className="text-shadow-sm hover:text-shadow-md">
              {item.name}
            </Link>
          ))}
          <div className="cursor-pointer">공유하기</div>
        </div>
        {/* background */}
      </div>
      {showMainNav && (
        <div
          className="fixed left-0 top-0 z-0 h-screen w-screen bg-transparent"
          onClick={setShowMainNavToggle}
          onTouchStart={setShowMainNavToggle}
        />
      )}
    </>
  );
}
