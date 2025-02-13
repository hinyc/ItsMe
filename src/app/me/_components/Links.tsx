'use client';
import React, { useState } from 'react';
import { RiInstagramLine } from 'react-icons/ri';
import URLBox from './URLBox';
import useMeStore from '../_store';

//sns - instagram, facebook, twitter, linkedin, github, blog, wechat, tictok, thread etc.

interface Link {
  name: string;
  url: string;
  effect?: string;
}

export default function Links() {
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  const { edit } = useMeStore();
  console.log(setLinks);
  return (
    <div>
      <h1 className="logo mb-4">IT&apos;S LINKS</h1>

      <div className={`flex flex-wrap ${edit ? 'gap-y-3' : 'gap-y-1'}`}>
        {links.map((link, index) => {
          if (!link.url) return null;
          return (
            <URLBox
              key={index}
              icon={RiInstagramLine}
              name={link.name}
              url={link.url}
              onChange={() => {}}
            />
          );
        })}
      </div>

      <br />
    </div>
  );
}

// url link 효과로 과금유도
const defaultLinks: Link[] = [
  {
    name: 'instagram',
    url: 'https://instagram.com/inyeolhong'
  },
  {
    name: 'facebook',
    url: 'https://facebook.com'
  },
  {
    name: 'x',
    url: 'https://x.com/wooluluKKANG'
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/honginyeol'
  },
  {
    name: 'github',
    url: 'https://github.com/hinyc'
  },
  {
    name: 'blog',
    url: 'https://blog.com'
  },
  {
    name: 'wechat',
    url: 'https://wechat.com'
  },
  {
    name: 'tictok',
    url: 'https://tictok.com'
  },
  {
    name: 'thread',
    url: 'https://threads.net/@inyeolhong'
  }
];
