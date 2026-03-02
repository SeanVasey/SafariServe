import {
  Globe,
  ArrowUpRight,
  CheckCircle2,
  PlusSquare,
  Compass,
} from "lucide-react";
import type { MediaInfo } from "../types";

interface Props {
  url: string;
  mediaInfo: MediaInfo;
  onOpenSafari: () => void;
  onScrollToGenerator: () => void;
}

export function UrlSubmissionPanel({
  url,
  mediaInfo,
  onOpenSafari,
  onScrollToGenerator,
}: Props) {
  const MediaIcon = mediaInfo.icon;

  return (
    <div className="bg-safari-surface/60 backdrop-blur-xl border border-safari-cyan/10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_48px_rgba(0,210,255,0.04)] p-5 mb-6 relative overflow-hidden group">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-safari-cyan/5 blur-3xl rounded-full pointer-events-none transition-opacity duration-500 group-hover:bg-safari-cyan/10" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] font-bold text-safari-cyan tracking-[0.15em] uppercase flex items-center gap-2">
          <Globe className="w-3 h-3" /> Send to Safari
        </h2>
      </div>

      <div className="relative mb-3">
        {/* URL input is read-only here — the actual input is in App */}
        <div className="w-full bg-safari-surface/80 border border-safari-cyan/20 rounded-xl px-4 py-3 text-safari-text min-h-[46px] flex items-center">
          {url ? (
            <span className="truncate">{url}</span>
          ) : (
            <span className="text-safari-text/40">Awaiting input...</span>
          )}
        </div>
        <button
          onClick={onOpenSafari}
          disabled={!url}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-safari-cyan/10 hover:bg-safari-cyan/20 disabled:opacity-50 text-safari-cyan rounded-lg flex items-center justify-center transition-colors"
          aria-label="Open in Safari"
        >
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-safari-cyan/5 border border-safari-cyan/10">
          <MediaIcon className="w-3.5 h-3.5 text-safari-teal" />
          <span className="text-xs font-medium text-safari-text/80">
            {url ? `Detected: ${mediaInfo.type}` : "Awaiting Input"}
          </span>
          {url && (
            <CheckCircle2 className="w-3.5 h-3.5 text-safari-cyan ml-1" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenSafari}
          disabled={!url}
          className="bg-safari-surface/80 backdrop-blur-md border border-safari-cyan/20 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 py-3 disabled:opacity-50 text-safari-text text-sm font-semibold"
        >
          <Compass className="w-4 h-4 text-safari-cyan" />
          Open in Safari
        </button>
        <button
          onClick={onScrollToGenerator}
          disabled={!url}
          className="bg-gradient-to-r from-safari-blue to-safari-teal text-white rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(0,210,255,0.2)] font-medium py-3 disabled:opacity-50 text-sm"
        >
          <PlusSquare className="w-4 h-4" />
          Home Shortcut
        </button>
      </div>
    </div>
  );
}
