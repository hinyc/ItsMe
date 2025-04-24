'use client';
import React from 'react';
import { PiPlus } from 'react-icons/pi';
import URLBox from './URLBox';
import useMeStore from '../_store';
import { ILink } from '@/types';
import { LinkIcon } from '@prisma/client/edge';
import userGlobalQuery from '@/common/query';
import ModifyButton from './ModifyButton';

export default function Links() {
  const { edit, links, setLinks } = useMeStore();
  const { data: user } = userGlobalQuery.useUser();

  const handleLinkChange = (index: number, field: keyof ILink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    const newLink: ILink = {
      id: Date.now(), // 임시 ID
      userId: user?.id || 0,
      linkName: '',
      url: '',
      icon: 'instagram' as LinkIcon,
      effect: undefined
    };
    setLinks([...links, newLink]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="logo mb-4">IT&apos;S LINKS</h1>
        {edit && (
          <button
            onClick={handleAddLink}
            className="mb-4 flex items-center gap-1 rounded-full bg-me-highlight px-3 py-1 text-sm text-white transition-all hover:bg-me-highlight/90"
          >
            <PiPlus className="h-4 w-4" />
            링크 추가
          </button>
        )}
      </div>

      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <p className="text-me-main">아직 추가된 링크가 없습니다.</p>
          {edit && (
            <button
              onClick={handleAddLink}
              className="flex items-center gap-1 rounded-full bg-me-highlight px-3 py-1 text-sm text-white transition-all hover:bg-me-highlight/90"
            >
              <PiPlus className="h-4 w-4" />
              링크 추가하기
            </button>
          )}
        </div>
      ) : (
        <div className={`flex flex-wrap ${edit ? 'gap-y-3' : 'gap-y-1'}`}>
          {links.map((link, index) => {
            // if (link.url) return null;
            return (
              <URLBox
                key={index}
                icon={link.icon}
                name={link.linkName}
                url={link.url}
                effect={link.effect ?? null}
                onChangeUrl={(value) => handleLinkChange(index, 'url', value)}
                onChangeEffect={(value) => handleLinkChange(index, 'effect', value)}
                onChangeName={(value) => handleLinkChange(index, 'linkName', value)}
                onChangeIcon={(value) => handleLinkChange(index, 'icon', value)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// url link 효과로 과금유도
