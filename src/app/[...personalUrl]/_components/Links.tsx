'use client';
import React, { useState } from 'react';
import { RiInstagramLine } from 'react-icons/ri';
import URLBox from './URLBox';
import useMeStore from '../_store';
import { ILink } from '@/types';

//sns - instagram, facebook, twitter, linkedin, github, blog, wechat, tictok, thread etc.

export default function Links() {
  const [links, setLinks] = useState<ILink[]>(defaultLinks);
  const { edit } = useMeStore();

  const handleLinkChange = (index: number, field: keyof ILink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };
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
              name={link.name}
              url={link.url}
              effect={link.effect}
              onChangeUrl={(value) => handleLinkChange(index, 'url', value)}
              onChangeEffect={(value) => handleLinkChange(index, 'effect', value)}
              onChangeName={(value) => handleLinkChange(index, 'name', value)}
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
const defaultLinks: ILink[] = [
  {
    icon: 'instagram',
    name: 'instagram',
    url: 'https://instagram.com/inyeolhong'
  },
  {
    icon: 'facebook',
    name: 'facebook',
    url: 'https://facebook.com'
  },
  {
    icon: 'x',
    name: 'x',
    url: 'https://x.com/wooluluKKANG'
  },
  {
    icon: 'linkedin',
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/honginyeol'
  },
  {
    icon: 'github',
    name: 'github',
    url: 'https://github.com/hinyc'
  },
  {
    icon: 'blog',
    name: 'blog',
    url: 'https://blog.com'
  },
  {
    icon: 'wechat',
    name: 'wechat',
    url: 'https://wechat.com'
  },
  {
    icon: 'tiktok',
    name: 'tiktok',
    url: 'https://tiktok.com'
  },
  {
    icon: 'thread',
    name: 'thread',
    url: 'https://threads.net/@inyeolhong'
  }
];
