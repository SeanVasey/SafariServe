import { ExternalLink } from "lucide-react";
import type { HistoryEntry } from "../types";
import { detectMediaType, extractDomain } from "../utils/detectMediaType";

interface Props {
  history: HistoryEntry[];
  onSelect: (url: string) => void;
}

export function HistoryPanel({ history, onSelect }: Props) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-safari-text/40 text-sm">
        No history yet.
      </div>
    );
  }

  return (
    <ul className="space-y-3 list-none p-0 m-0">
      {history.map((item) => {
        const info = detectMediaType(item.url);
        const MediaIcon = info.icon;

        return (
          <li
            key={item.url}
            className="bg-safari-surface/60 backdrop-blur-xl border border-safari-cyan/10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_48px_rgba(0,210,255,0.04)] p-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-safari-deep border border-safari-cyan/10 flex items-center justify-center shrink-0">
              <MediaIcon className="w-4 h-4 text-safari-teal" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-safari-text truncate">
                {extractDomain(item.url)}
              </div>
              <div className="text-[10px] text-safari-text/40 truncate">
                {item.url}
              </div>
            </div>
            <button
              onClick={() => onSelect(item.url)}
              className="p-2 rounded-lg bg-safari-cyan/5 hover:bg-safari-cyan/15 text-safari-cyan transition-colors"
              aria-label={`Load ${extractDomain(item.url)}`}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
