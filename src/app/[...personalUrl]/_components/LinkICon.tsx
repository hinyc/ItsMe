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

export const iconMap: Map<LinkIcon, IconType[]> = new Map([
  ['instagram', [RiInstagramLine, RiInstagramFill, SiInstagram, FaInstagram]],
  ['facebook', [RiFacebookBoxLine, RiFacebookFill, SiFacebook, FaFacebook]],
  ['x', [RiTwitterXLine, RiTwitterXFill, FaTwitter]],
  ['linkedin', [RiLinkedinBoxLine, RiLinkedinFill, SiLinkedin, FaLinkedin]],
  ['github', [RiGithubLine, RiGithubFill, SiGithub, FaGithub]],
  ['blog', [RiBloggerLine]],
  ['wechat', [RiWechatLine]],
  ['tiktok', [RiTiktokLine]],
  ['thread', [PiThreadsLogoLight]],
  ['youtube', [RiYoutubeLine, RiYoutubeFill, SiYoutube, FaYoutube]],
  ['discord', [RiDiscordLine, RiDiscordFill, SiDiscord, FaDiscord]],
  ['telegram', [RiTelegramLine, RiTelegramFill, SiTelegram, FaTelegram]],
  ['pinterest', [PiPinterestLogoLight, RiPinterestFill, SiPinterest, FaPinterest]],
  ['reddit', [PiRedditLogoLight, RiRedditFill, SiReddit, FaReddit]],
  ['spotify', [RiSpotifyLine, RiSpotifyFill, SiSpotify, FaSpotify]],
  ['behance', [RiBehanceLine, RiBehanceFill, SiBehance, FaBehance]],
  ['dribbble', [RiDribbbleLine, RiDribbbleFill, SiDribbble, FaDribbble]],
  ['medium', [RiMediumLine, RiMediumFill, SiMedium, FaMedium]],
  ['twitch', [RiTwitchLine, RiTwitchFill, SiTwitch, FaTwitch]],
  ['snapchat', [RiSnapchatLine, RiSnapchatFill, SiSnapchat, FaSnapchat]],
  ['notion', [SiNotion]],
  ['tistory', [SiTistory]],
  ['naver', [SiNaver]],
  ['heart', [FaHeart]],
  ['star', [FaStar]],
  ['rocket', [FaRocket]],
  ['lightbulb', [FaLightbulb]],
  ['paw', [FaPaw]],
  ['ghost', [FaGhost]],
  ['dragon', [FaDragon]],
  ['cat', [FaCat]],
  ['dog', [FaDog]]
]);

export default function LinkIconComponent({ iconType }: { iconType: LinkIcon }) {
  const icons = iconMap.get(iconType);
  if (!icons || icons.length === 0) return null;

  // 첫 번째 아이콘을 기본으로 사용
  const Icon = icons[0];
  return <Icon className="mr-1 h-5 w-5" />;
}
