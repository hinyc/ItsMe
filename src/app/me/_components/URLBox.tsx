import React from 'react';
import { IconType } from 'react-icons';
import useMeStore from '../_store';
import { PiLinkSimple } from 'react-icons/pi';

interface URLBoxProps {
  name: string;
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: IconType;
}
export default function URLBox({ name, url, onChange, icon: Icon }: URLBoxProps) {
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
        <Icon className="mr-1 h-5 w-5" />
        <input
          className={`focus:border-me-highlight font-semibold capitalize outline-none focus:outline-none disabled:bg-transparent ${edit ? 'border-me-main mb-1 w-[120px] border-b-2 transition-all' : 'max-w-[100px]'}`}
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
              onChange(e);
            }
          }}
        />
      </div>
      {edit && (
        <div className="flex items-center pl-6">
          <PiLinkSimple className="mr-1 h-4 w-4" />
          <input
            className="border-me-main focus:border-me-highlight w-[calc(100%-40px)] border-b-2 px-1 outline-none transition-all focus:outline-none"
            type="text"
            value={url}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}
