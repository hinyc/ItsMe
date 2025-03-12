import useMeStore from '@/app/me/_store';
import React from 'react';
import { IconType } from 'react-icons';

interface URLBoxProps {
  name: string;
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: IconType;
}
export default function URLBox({ name, url, onChange, icon: Icon }: URLBoxProps) {
  const { edit } = useMeStore();
  return (
    <div>
      <div className="flex">
        <Icon className="mr-1 h-5 w-5" />
        <span className="font-semibold capitalize">{name}</span>
      </div>
      {edit && (
        <div>
          <span className="mr-1 text-stone-400">URL</span>
          <input className="" type="text" value={url} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
