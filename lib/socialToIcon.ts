import Link from "next/link";
import {
  SiInstagram,
  SiYoutube,
  SiGithub,
  SiFacebook,
  SiPinterest,
  SiX,
  SiTiktok,
  SiDiscord,
  SiTwitch,
} from "@icons-pack/react-simple-icons";

const socialToIcon = {
  instagram: SiInstagram,
  youtube: SiYoutube,
  github: SiGithub,
  facebook: SiFacebook,
  pinterest: SiPinterest,
  x: SiX,
  tiktok: SiTiktok,
  discord: SiDiscord,
  twitch: SiTwitch,
  other: SiGithub, // Default icon for other platforms
} as const;

export type SocialPlatform = keyof typeof socialToIcon;

export function getSocialIcon(platform: SocialPlatform) {
  return socialToIcon[platform] || SiGithub;
}

export default socialToIcon;
