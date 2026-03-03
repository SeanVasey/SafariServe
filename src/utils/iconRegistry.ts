import type { CategoryIconEntry } from "../components/CategoryIcons";
import {
  GlobeIcon,
  NewsIcon,
  SportsIcon,
  BankingIcon,
  CodingIcon,
  AIIcon,
  StreamingIcon,
  MusicNoteIcon,
  BusinessIcon,
  StocksIcon,
  EmailIcon,
} from "../components/CategoryIcons";

export const ICON_REGISTRY: Record<string, CategoryIconEntry> = {
  globe:     { component: GlobeIcon,     label: "Globe",     color: "rgba(0, 210, 255, 0.85)" },
  news:      { component: NewsIcon,      label: "News",      color: "rgba(255, 100, 80, 0.85)" },
  sports:    { component: SportsIcon,    label: "Sports",    color: "rgba(52, 211, 153, 0.85)" },
  banking:   { component: BankingIcon,   label: "Banking",   color: "rgba(96, 165, 250, 0.85)" },
  coding:    { component: CodingIcon,    label: "Coding",    color: "rgba(251, 191, 36, 0.85)" },
  ai:        { component: AIIcon,        label: "AI",        color: "rgba(167, 139, 250, 0.85)" },
  streaming: { component: StreamingIcon, label: "Streaming", color: "rgba(248, 113, 113, 0.85)" },
  music:     { component: MusicNoteIcon, label: "Music",     color: "rgba(244, 114, 182, 0.85)" },
  business:  { component: BusinessIcon,  label: "Business",  color: "rgba(45, 212, 191, 0.85)" },
  stocks:    { component: StocksIcon,    label: "Stocks",    color: "rgba(74, 222, 128, 0.85)" },
  email:     { component: EmailIcon,     label: "Email",     color: "rgba(56, 189, 248, 0.85)" },
};

export const ICON_IDS = Object.keys(ICON_REGISTRY);

export function getCategoryIcon(id: string): CategoryIconEntry {
  return ICON_REGISTRY[id] ?? ICON_REGISTRY["globe"]!;
}
