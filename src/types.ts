import type { LucideIcon } from "lucide-react";

export type IconId =
  | "globe"
  | "news"
  | "sports"
  | "banking"
  | "coding"
  | "ai"
  | "streaming"
  | "music"
  | "business"
  | "stocks"
  | "email";

export interface MediaInfo {
  type: MediaType;
  icon: LucideIcon;
  shortcutPrefix: IconId;
}

export type MediaType =
  | "None"
  | "Webpage"
  | "Video"
  | "Audio"
  | "Image"
  | "Document"
  | "App/Deep-Link";

export interface HistoryEntry {
  url: string;
  type: MediaType;
  timestamp: number;
}

export type TabId = "generator" | "history" | "templates";
