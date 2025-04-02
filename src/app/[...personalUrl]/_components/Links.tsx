'use client';
import React, { useState } from 'react';
import { RiInstagramLine } from 'react-icons/ri';
import URLBox from './URLBox';
import useMeStore from '../_store';
import { ILink } from '@/types';

export default function Links() {
  const { edit, links, setLinks } = useMeStore();

  const handleLinkChange = (index: number, field: keyof ILink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  console.log(links);
  return (
    <div>
      <h1 className="logo mb-4">IT&apos;S LINKS</h1>

      <div className={`flex flex-wrap ${edit ? 'gap-y-3' : 'gap-y-1'}`}>
        {links.map((link, index) => {
          if (!link.url) return null;
          return (
            <URLBox
              key={index}
              icon={link.icon}
              name={link.linkName}
              url={link.url}
              effect={link.effect}
              onChangeUrl={(value) => handleLinkChange(index, 'url', value)}
              onChangeEffect={(value) => handleLinkChange(index, 'effect', value)}
              onChangeName={(value) => handleLinkChange(index, 'linkName', value)}
              onChangeIcon={(value) => handleLinkChange(index, 'icon', value)}
            />
          );
        })}
      </div>

      <br />
    </div>
  );
}

// url link 효과로 과금유도
