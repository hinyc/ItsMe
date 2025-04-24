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
  RiBloggerLine,
  RiYoutubeLine,
  RiDiscordLine,
  RiTelegramLine,
  RiPinterestLine,
  RiRedditLine,
  RiSpotifyLine,
  RiBehanceLine,
  RiDribbbleLine,
  RiMediumLine,
  RiTwitchLine,
  RiSnapchatLine,
  RiGithubFill,
  RiInstagramFill,
  RiFacebookFill,
  RiTwitterXFill,
  RiLinkedinFill,
  RiYoutubeFill,
  RiDiscordFill,
  RiTelegramFill,
  RiPinterestFill,
  RiRedditFill,
  RiSpotifyFill,
  RiBehanceFill,
  RiDribbbleFill,
  RiMediumFill,
  RiTwitchFill,
  RiSnapchatFill
} from 'react-icons/ri';
import { PiThreadsLogoLight, PiPinterestLogoLight, PiRedditLogoLight } from 'react-icons/pi';
import {
  SiNotion,
  SiTistory,
  SiNaver,
  SiGithub,
  SiInstagram,
  SiFacebook,
  SiLinkedin,
  SiYoutube,
  SiDiscord,
  SiTelegram,
  SiPinterest,
  SiReddit,
  SiSpotify,
  SiBehance,
  SiDribbble,
  SiMedium,
  SiTwitch,
  SiSnapchat
} from 'react-icons/si';
import {
  FaHeart,
  FaStar,
  FaRocket,
  FaLightbulb,
  FaPaw,
  FaGhost,
  FaDragon,
  FaCat,
  FaDog,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaPinterest,
  FaReddit,
  FaSpotify,
  FaBehance,
  FaDribbble,
  FaMedium,
  FaTwitch,
  FaSnapchat
} from 'react-icons/fa';
import { LinkIcon } from '@prisma/client/edge';

export type IconInfo = {
  type: LinkIcon;
  icon: IconType;
  variant: string;
};

export const allIcons: IconInfo[] = [
  { type: 'instagram', icon: RiInstagramLine, variant: 'line' },
  { type: 'instagram', icon: RiInstagramFill, variant: 'fill' },
  { type: 'instagram', icon: SiInstagram, variant: 'simple' },
  { type: 'instagram', icon: FaInstagram, variant: 'font-awesome' },
  { type: 'facebook', icon: RiFacebookBoxLine, variant: 'line' },
  { type: 'facebook', icon: RiFacebookFill, variant: 'fill' },
  { type: 'facebook', icon: SiFacebook, variant: 'simple' },
  { type: 'facebook', icon: FaFacebook, variant: 'font-awesome' },
  { type: 'x', icon: RiTwitterXLine, variant: 'line' },
  { type: 'x', icon: RiTwitterXFill, variant: 'fill' },
  { type: 'x', icon: FaTwitter, variant: 'font-awesome' },
  { type: 'linkedin', icon: RiLinkedinBoxLine, variant: 'line' },
  { type: 'linkedin', icon: RiLinkedinFill, variant: 'fill' },
  { type: 'linkedin', icon: SiLinkedin, variant: 'simple' },
  { type: 'linkedin', icon: FaLinkedin, variant: 'font-awesome' },
  { type: 'github', icon: RiGithubLine, variant: 'line' },
  { type: 'github', icon: RiGithubFill, variant: 'fill' },
  { type: 'github', icon: SiGithub, variant: 'simple' },
  { type: 'github', icon: FaGithub, variant: 'font-awesome' },
  { type: 'blog', icon: RiBloggerLine, variant: 'line' },
  { type: 'wechat', icon: RiWechatLine, variant: 'line' },
  { type: 'tiktok', icon: RiTiktokLine, variant: 'line' },
  { type: 'thread', icon: PiThreadsLogoLight, variant: 'light' },
  { type: 'youtube', icon: RiYoutubeLine, variant: 'line' },
  { type: 'youtube', icon: RiYoutubeFill, variant: 'fill' },
  { type: 'youtube', icon: SiYoutube, variant: 'simple' },
  { type: 'youtube', icon: FaYoutube, variant: 'font-awesome' },
  { type: 'discord', icon: RiDiscordLine, variant: 'line' },
  { type: 'discord', icon: RiDiscordFill, variant: 'fill' },
  { type: 'discord', icon: SiDiscord, variant: 'simple' },
  { type: 'discord', icon: FaDiscord, variant: 'font-awesome' },
  { type: 'telegram', icon: RiTelegramLine, variant: 'line' },
  { type: 'telegram', icon: RiTelegramFill, variant: 'fill' },
  { type: 'telegram', icon: SiTelegram, variant: 'simple' },
  { type: 'telegram', icon: FaTelegram, variant: 'font-awesome' },
  { type: 'pinterest', icon: PiPinterestLogoLight, variant: 'light' },
  { type: 'pinterest', icon: RiPinterestFill, variant: 'fill' },
  { type: 'pinterest', icon: SiPinterest, variant: 'simple' },
  { type: 'pinterest', icon: FaPinterest, variant: 'font-awesome' },
  { type: 'reddit', icon: PiRedditLogoLight, variant: 'light' },
  { type: 'reddit', icon: RiRedditFill, variant: 'fill' },
  { type: 'reddit', icon: SiReddit, variant: 'simple' },
  { type: 'reddit', icon: FaReddit, variant: 'font-awesome' },
  { type: 'spotify', icon: RiSpotifyLine, variant: 'line' },
  { type: 'spotify', icon: RiSpotifyFill, variant: 'fill' },
  { type: 'spotify', icon: SiSpotify, variant: 'simple' },
  { type: 'spotify', icon: FaSpotify, variant: 'font-awesome' },
  { type: 'behance', icon: RiBehanceLine, variant: 'line' },
  { type: 'behance', icon: RiBehanceFill, variant: 'fill' },
  { type: 'behance', icon: SiBehance, variant: 'simple' },
  { type: 'behance', icon: FaBehance, variant: 'font-awesome' },
  { type: 'dribbble', icon: RiDribbbleLine, variant: 'line' },
  { type: 'dribbble', icon: RiDribbbleFill, variant: 'fill' },
  { type: 'dribbble', icon: SiDribbble, variant: 'simple' },
  { type: 'dribbble', icon: FaDribbble, variant: 'font-awesome' },
  { type: 'medium', icon: RiMediumLine, variant: 'line' },
  { type: 'medium', icon: RiMediumFill, variant: 'fill' },
  { type: 'medium', icon: SiMedium, variant: 'simple' },
  { type: 'medium', icon: FaMedium, variant: 'font-awesome' },
  { type: 'twitch', icon: RiTwitchLine, variant: 'line' },
  { type: 'twitch', icon: RiTwitchFill, variant: 'fill' },
  { type: 'twitch', icon: SiTwitch, variant: 'simple' },
  { type: 'twitch', icon: FaTwitch, variant: 'font-awesome' },
  { type: 'snapchat', icon: RiSnapchatLine, variant: 'line' },
  { type: 'snapchat', icon: RiSnapchatFill, variant: 'fill' },
  { type: 'snapchat', icon: SiSnapchat, variant: 'simple' },
  { type: 'snapchat', icon: FaSnapchat, variant: 'font-awesome' },
  { type: 'notion', icon: SiNotion, variant: 'simple' },
  { type: 'tistory', icon: SiTistory, variant: 'simple' },
  { type: 'naver', icon: SiNaver, variant: 'simple' },
  { type: 'heart', icon: FaHeart, variant: 'font-awesome' },
  { type: 'star', icon: FaStar, variant: 'font-awesome' },
  { type: 'rocket', icon: FaRocket, variant: 'font-awesome' },
  { type: 'lightbulb', icon: FaLightbulb, variant: 'font-awesome' },
  { type: 'paw', icon: FaPaw, variant: 'font-awesome' },
  { type: 'ghost', icon: FaGhost, variant: 'font-awesome' },
  { type: 'dragon', icon: FaDragon, variant: 'font-awesome' },
  { type: 'cat', icon: FaCat, variant: 'font-awesome' },
  { type: 'dog', icon: FaDog, variant: 'font-awesome' }
];

export const iconMap: Map<LinkIcon, IconType[]> = new Map(
  allIcons.reduce((acc: Map<LinkIcon, IconType[]>, { type, icon }) => {
    if (!acc.has(type)) {
      acc.set(type, []);
    }
    acc.get(type)?.push(icon);
    return acc;
  }, new Map<LinkIcon, IconType[]>())
);

interface LinkIconComponentProps {
  iconType: LinkIcon;
  variant?: string;
}

export default function LinkIconComponent({ iconType, variant = 'line' }: LinkIconComponentProps) {
  const icon = allIcons.find((i) => i.type === iconType && i.variant === variant)?.icon;
  if (!icon) return null;

  return React.createElement(icon, { className: 'mr-1 h-5 w-5' });
}
