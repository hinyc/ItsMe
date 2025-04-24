import React, { useState } from 'react';
import useMeStore from '../_store';
import { PiLinkSimple } from 'react-icons/pi';
import { LinkIcon } from '@prisma/client/edge';
import LinkIconComponent from './LinkICon';
import IconSelectModal from './IconSelectModal';

interface URLBoxProps {
  name: string;
  url: string;
  onChangeUrl: (value: string) => void;
  onChangeEffect: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangeIcon: (value: LinkIcon) => void;
  icon: LinkIcon;
  effect: string | null;
}

export default function URLBox({
  name,
  url,
  onChangeUrl,
  onChangeEffect,
  onChangeName,
  onChangeIcon,
  icon,
  effect
}: URLBoxProps) {
  const { edit } = useMeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openUrl = () => {
    window.open(url, '_blank');
  };

  return (
    <div className={edit ? 'w-full' : 'w-fit'}>
      <div className="relative flex h-fit items-center">
        {!edit && (
          <a
            className="absolute z-10 h-full w-full"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {edit ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mr-1 flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <LinkIconComponent iconType={icon} />
          </button>
        ) : (
          <LinkIconComponent iconType={icon} />
        )}
        <input
          className={`font-semibold capitalize outline-none focus:border-me-highlight focus:outline-none disabled:bg-transparent ${edit ? 'mb-1 w-[120px] border-b-2 border-me-main transition-all' : 'max-w-[100px]'}`}
          disabled={!edit}
          value={name}
          onClick={() => {
            if (!edit) {
              openUrl();
            }
          }}
          onChange={(e) => {
            if (edit) {
              onChangeName(e.target.value);
            }
          }}
        />
      </div>
      {edit && (
        <div className="flex items-center pl-6">
          <PiLinkSimple className="mr-1 h-4 w-4" />
          <input
            className="w-[calc(100%-40px)] border-b-2 border-me-main px-1 outline-none transition-all focus:border-me-highlight focus:outline-none"
            type="text"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
          />
          {effect && (
            <input
              className="w-[calc(100%-40px)] border-b-2 border-me-main px-1 outline-none transition-all focus:border-me-highlight focus:outline-none"
              type="text"
              value={effect}
              onChange={(e) => onChangeEffect(e.target.value)}
            />
          )}
        </div>
      )}

      <IconSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={onChangeIcon}
        currentIcon={icon}
      />
    </div>
  );
}
