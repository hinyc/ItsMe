import React from 'react';
import { IconType } from 'react-icons';
import useMeStore from '../_store';
import { PiLinkSimple } from 'react-icons/pi';
import { TypeIcon } from '@/types';
import LinkIcon from './LinkICon';

interface URLBoxProps {
  name: string;
  url: string;
  onChangeUrl: (value: string) => void;
  onChangeEffect: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangeIcon: (value: string) => void;
  icon: TypeIcon;
  effect?: string;
}
export default function URLBox({
  name,
  url,
  onChangeUrl,
  onChangeEffect,
  onChangeName,
  icon,
  effect
}: URLBoxProps) {
  //effect 미사용중
  const { edit } = useMeStore();
  const openUrl = () => {
    window.open(url, '_blank');
  };
  return (
    <div className={edit ? 'w-full' : 'w-fit'}>
      <div className="relative flex h-fit">
        {!edit && (
          <a
            className="absolute z-10 h-full w-full"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        <LinkIcon iconType={icon} />
        <input
          className={`font-semibold capitalize outline-none focus:border-me-highlight focus:outline-none disabled:bg-transparent ${edit ? 'mb-1 w-[120px] border-b-2 border-me-main transition-all' : 'max-w-[100px]'}`}
          disabled={!edit}
          value={name}
          onClick={() => {
            console.log('click');
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
    </div>
  );
}
