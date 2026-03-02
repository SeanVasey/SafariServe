import { Sparkles, History, Star } from "lucide-react";
import type { TabId } from "../types";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; icon: typeof History; label: string }[] = [
  { id: "generator", icon: Sparkles, label: "Generator" },
  { id: "history", icon: History, label: "History" },
  { id: "templates", icon: Star, label: "Templates" },
];

export function QuickActionsBar({ activeTab, onTabChange }: Props) {
  return (
    <nav
      className="flex w-full justify-between items-center gap-1.5 sm:gap-2 mb-6"
      aria-label="Quick actions"
    >
      {TABS.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1 rounded-full border transition-all ${
              isActive
                ? "bg-safari-cyan/15 border-safari-cyan/30 text-safari-cyan shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                : "bg-safari-surface/60 border-safari-cyan/10 text-safari-text/70 hover:bg-safari-surface hover:text-safari-text"
            }`}
          >
            <TabIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
