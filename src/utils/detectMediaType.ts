import {
  Globe,
  Film,
  Music,
  Image as ImageIcon,
  FileText,
  Smartphone,
} from "lucide-react";
import type { MediaInfo } from "../types";

export function detectMediaType(url: string): MediaInfo {
  if (!url) return { type: "None", icon: Globe, shortcutPrefix: "🌐" };

  const lowerUrl = url.toLowerCase();

  if (
    lowerUrl.match(/\.(mp4|webm|mov)($|\?)/) ||
    lowerUrl.includes("youtube.com") ||
    lowerUrl.includes("vimeo.com") ||
    lowerUrl.includes("youtu.be")
  ) {
    return { type: "Video", icon: Film, shortcutPrefix: "🎬" };
  }

  if (
    lowerUrl.match(/\.(mp3|wav|m4a)($|\?)/) ||
    lowerUrl.includes("spotify.com") ||
    lowerUrl.includes("music.apple.com")
  ) {
    return { type: "Audio", icon: Music, shortcutPrefix: "🎵" };
  }

  if (lowerUrl.match(/\.(jpg|jpeg|png|gif|webp)($|\?)/)) {
    return { type: "Image", icon: ImageIcon, shortcutPrefix: "🖼️" };
  }

  if (lowerUrl.match(/\.(pdf|doc|docx|txt)($|\?)/)) {
    return { type: "Document", icon: FileText, shortcutPrefix: "📄" };
  }

  if (
    lowerUrl.startsWith("shortcuts://") ||
    lowerUrl.includes("apps.apple.com")
  ) {
    return { type: "App/Deep-Link", icon: Smartphone, shortcutPrefix: "📱" };
  }

  return { type: "Webpage", icon: Globe, shortcutPrefix: "🌐" };
}

export function extractDomain(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch {
    return "Link";
  }
}
