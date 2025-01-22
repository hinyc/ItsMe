'use client';
import React from 'react';
import Hamburger from './Hamburger';
import NavMenu from './NavMenu';

export default function Nav() {
  return (
    <div className="relative w-full">
      <Hamburger />
      <NavMenu />
    </div>
  );
}
