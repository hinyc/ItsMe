import React from 'react';
import { IconType } from 'react-icons';
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiWechatLine,
  RiTiktokLine,
  RiBloggerLine
} from 'react-icons/ri';
import { PiThreadsLogoLight } from 'react-icons/pi';
import { TypeIcon } from '@/types';

const iconMap: Map<TypeIcon, IconType> = new Map([
  ['instagram', RiInstagramLine],
  ['facebook', RiFacebookBoxLine],
  ['x', RiTwitterXLine],
  ['linkedin', RiLinkedinBoxLine],
  ['github', RiGithubLine],
  ['blog', RiBloggerLine],
  ['wechat', RiWechatLine],
  ['tiktok', RiTiktokLine],
  ['thread', PiThreadsLogoLight]
]);

export default function LinkIcon({ iconType }: { iconType: TypeIcon }) {
  const Icon = iconMap.get(iconType);

  if (!Icon) return null;

  return <Icon className="mr-1 h-5 w-5" />;
}
