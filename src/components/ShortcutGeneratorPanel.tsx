import { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  Download,
  Copy,
  CheckCircle2,
} from "lucide-react";

interface Props {
  url: string;
  shortcutName: string;
  shortcutIcon: string;
  onShortcutNameChange: (name: string) => void;
  onShortcutIconChange: (icon: string) => void;
}

const ICON_OPTIONS = ["🌐", "🎬", "🎵", "📄", "📱", "⭐", "🚀"];

export function ShortcutGeneratorPanel({
  url,
  shortcutName,
  shortcutIcon,
  onShortcutNameChange,
  onShortcutIconChange,
}: Props) {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopySteps = () => {
    const steps = [
      "SAFARISERVE AUTOMATION STEPS:",
      `1. Open URL: ${url}`,
      "2. Pass to Safari via Share Sheet",
      "3. Wait 2 seconds for load",
      "4. Trigger 'Add to Home Screen'",
      `Name: ${shortcutIcon} ${shortcutName}`,
    ].join("\n");
    navigator.clipboard.writeText(steps).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }).catch(() => {
      // Clipboard API may fail in non-HTTPS contexts
    });
  };

  const handleInstallShortcut = () => {
    const encodedName = encodeURIComponent(shortcutName);
    window.open(`shortcuts://create-shortcut?name=${encodedName}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      id="generator-panel"
      className="bg-safari-surface/60 backdrop-blur-xl border border-safari-cyan/10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_48px_rgba(0,210,255,0.04)] p-5 mb-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[11px] font-bold text-safari-teal tracking-[0.15em] uppercase flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Shortcut Generator
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex gap-3">
          <div className="w-16">
            <label className="block text-[10px] uppercase text-safari-text/50 font-bold mb-1 ml-1">
              Icon
            </label>
            <div className="relative">
              <select
                value={shortcutIcon}
                onChange={(e) => onShortcutIconChange(e.target.value)}
                className="w-full bg-safari-surface/80 border border-safari-cyan/20 rounded-xl px-2 py-2.5 text-xl appearance-none text-center focus:outline-none focus:border-safari-cyan"
                aria-label="Shortcut icon"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-safari-cyan absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] uppercase text-safari-text/50 font-bold mb-1 ml-1">
              Shortcut Name
            </label>
            <input
              type="text"
              value={shortcutName}
              onChange={(e) => onShortcutNameChange(e.target.value)}
              className="w-full bg-safari-surface/80 border border-safari-cyan/20 rounded-xl px-4 py-2.5 text-safari-text placeholder-safari-text/40 focus:outline-none focus:border-safari-cyan focus:ring-1 focus:ring-safari-cyan/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all"
              aria-label="Shortcut name"
            />
          </div>
        </div>

        <div className="bg-safari-deep/80 rounded-xl p-4 border border-safari-cyan/5 relative">
          <div className="absolute top-0 left-4 -translate-y-1/2 px-2 bg-safari-deep text-[9px] uppercase tracking-wider text-safari-cyan font-bold">
            Generated Steps
          </div>
          <ol role="list" className="text-xs text-safari-text/70 space-y-2.5 font-mono list-none pl-0">
            <li className="flex items-start gap-2">
              <span className="text-safari-cyan/50 select-none">1.</span>
              <span>
                Receive URL:{" "}
                <span className="text-safari-text truncate inline-block max-w-[200px] align-bottom">
                  {url || "[Waiting]"}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-safari-cyan/50 select-none">2.</span>
              <span>
                Open URL in <span className="text-safari-cyan">Safari</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-safari-cyan/50 select-none">3.</span>
              <span>Wait 2 seconds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-safari-cyan/50 select-none">4.</span>
              <span>
                Add to Home Screen as{" "}
                <span className="bg-safari-surface px-1.5 py-0.5 rounded text-safari-text border border-safari-cyan/20">
                  {shortcutIcon} {shortcutName}
                </span>
              </span>
            </li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleInstallShortcut}
          className="bg-safari-surface/80 backdrop-blur-md border border-safari-cyan/30 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 py-2.5 text-xs font-semibold text-safari-cyan hover:bg-safari-cyan/10"
        >
          <Download className="w-3.5 h-3.5" />
          Install Shortcut
        </button>
        <button
          onClick={handleCopySteps}
          className="bg-safari-surface/80 backdrop-blur-md border border-safari-cyan/20 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 py-2.5 text-xs font-semibold text-safari-text"
        >
          {showCopied ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-safari-text/70" />
          )}
          {showCopied ? "Copied!" : "Copy Steps"}
        </button>
      </div>
    </div>
  );
}
