import type { LucideIcon } from "lucide-react";

export interface MediaInfo {
  type: MediaType;
  icon: LucideIcon;
  shortcutPrefix: string;
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
