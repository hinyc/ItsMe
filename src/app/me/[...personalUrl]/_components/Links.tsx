'use client';
import React, { useState } from 'react';

//sns - instagram, facebook, twitter, linkedin, github, blog, wechat, tictok, thread etc.

interface Link {
  name: string;
  showOriginalUrl: boolean;
  originalUrl: string;
  customUrl?: string;
  effect?: string;
}

export default function Links() {
  const [links, setLinks] = useState<Link[]>(defaultLinks);
  console.log(setLinks);
  return (
    <div>
      <h1 className="logo">IT&apos;S LINKS</h1>

      <div>
        {links.map((link, index) => {
          const fullUrl = link.originalUrl + link.customUrl;
          if (!link.customUrl) return null;
          return (
            <div key={index} className="flex items-center">
              <div className="w-20">{link.name}</div>
              {link.showOriginalUrl ? (
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                  {fullUrl}
                </a>
              ) : (
                <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                  @{link.customUrl}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// url link 효과로 과금유도
const defaultLinks: Link[] = [
  {
    name: 'instagram',
    showOriginalUrl: false,
    originalUrl: 'https://instagram.com/',
    customUrl: 'inyeolhong'
  },
  {
    name: 'facebook',
    showOriginalUrl: false,
    originalUrl: 'https://facebook.com'
  },
  {
    name: 'x',
    showOriginalUrl: false,
    originalUrl: 'https://x.com/',
    customUrl: 'wooluluKKANG'
  },
  {
    name: 'linkedin',
    showOriginalUrl: false,
    originalUrl: 'https://www.linkedin.com/in/',
    customUrl: 'honginyeol'
  },
  {
    name: 'github',
    showOriginalUrl: false,
    originalUrl: 'https://github.com/',
    customUrl: 'hinyc'
  },
  {
    name: 'blog',
    showOriginalUrl: false,
    originalUrl: 'https://blog.com'
  },
  {
    name: 'wechat',
    showOriginalUrl: false,
    originalUrl: 'https://wechat.com'
  },
  {
    name: 'tictok',
    showOriginalUrl: false,
    originalUrl: 'https://tictok.com'
  },
  {
    name: 'thread',
    showOriginalUrl: false,
    originalUrl: 'https://threads.net/@',
    customUrl: 'inyeolhong'
  }
];
