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
const defaultLinks: ILink[] = [
  {
    icon: 'instagram',
    linkName: 'instagram',
    url: 'https://instagram.com/inyeolhong',
    effect: null
  },
  {
    icon: 'facebook',
    linkName: 'facebook',
    url: 'https://facebook.com',
    effect: null
  },
  {
    icon: 'x',
    linkName: 'x',
    url: 'https://x.com/wooluluKKANG',
    effect: null
  },
  {
    icon: 'linkedin',
    linkName: 'linkedin',
    url: 'https://www.linkedin.com/in/honginyeol',
    effect: null
  },
  {
    icon: 'github',
    linkName: 'github',
    url: 'https://github.com/hinyc',
    effect: null
  },
  {
    icon: 'blog',
    linkName: 'blog',
    url: 'https://blog.com',
    effect: null
  },
  {
    icon: 'wechat',
    linkName: 'wechat',
    url: 'https://wechat.com',
    effect: null
  },
  {
    icon: 'tiktok',
    linkName: 'tiktok',
    url: 'https://tiktok.com',
    effect: null
  },
  {
    icon: 'thread',
    linkName: 'thread',
    url: 'https://threads.net/@inyeolhong',
    effect: null
  }
];
