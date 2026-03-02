import { History, Star, Share, Settings } from "lucide-react";
import type { TabId } from "../types";

interface Props {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const ACTIONS: { id: TabId | "share" | "settings"; icon: typeof History; label: string }[] = [
  { id: "history", icon: History, label: "History" },
  { id: "templates", icon: Star, label: "Templates" },
  { id: "share", icon: Share, label: "Share" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function QuickActionsBar({ activeTab, onTabChange }: Props) {
  return (
    <nav
      className="flex w-full justify-between items-center gap-1.5 sm:gap-2 mb-6"
      aria-label="Quick actions"
    >
      {ACTIONS.map((action) => {
        const ActionIcon = action.icon;
        const isActive = activeTab === action.id;
        const isNavigable = action.id === "history" || action.id === "templates" || action.id === "generator";

        return (
          <button
            key={action.id}
            onClick={() => {
              if (isNavigable) {
                onTabChange(action.id as TabId);
              }
            }}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1 rounded-full border transition-all ${
              isActive
                ? "bg-safari-cyan/15 border-safari-cyan/30 text-safari-cyan shadow-[0_0_15px_rgba(0,210,255,0.1)]"
                : "bg-safari-surface/60 border-safari-cyan/10 text-safari-text/70 hover:bg-safari-surface hover:text-safari-text"
            }`}
          >
            <ActionIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap">
              {action.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
