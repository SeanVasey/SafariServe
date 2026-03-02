import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { UrlSubmissionPanel } from "./components/UrlSubmissionPanel";
import { ShortcutGeneratorPanel } from "./components/ShortcutGeneratorPanel";
import { QuickActionsBar } from "./components/QuickActionsBar";
import { HistoryPanel } from "./components/HistoryPanel";
import { TemplatesPanel } from "./components/TemplatesPanel";
import { detectMediaType, extractDomain } from "./utils/detectMediaType";
import { loadHistory, addToHistory } from "./utils/storage";
import type { MediaInfo, HistoryEntry, TabId } from "./types";

const DEFAULT_MEDIA: MediaInfo = detectMediaType("");

const SAFE_PROTOCOLS = ["http:", "https:", "shortcuts:"];

export default function App() {
  const [url, setUrl] = useState("");
  const [mediaInfo, setMediaInfo] = useState<MediaInfo>(DEFAULT_MEDIA);
  const [shortcutName, setShortcutName] = useState("My Shortcut");
  const [shortcutIcon, setShortcutIcon] = useState("🌐");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("generator");

  // Read ?url= param on mount + load persisted data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramUrl = params.get("url");
    if (paramUrl) setUrl(paramUrl);

    setHistory(loadHistory());
  }, []);

  // Auto-detect media type on URL change
  useEffect(() => {
    if (url) {
      const info = detectMediaType(url);
      setMediaInfo(info);
      setShortcutIcon(info.shortcutPrefix);
      setShortcutName(`Open ${extractDomain(url)}`);
    } else {
      setMediaInfo(DEFAULT_MEDIA);
      setShortcutName("My Shortcut");
      setShortcutIcon("🌐");
    }
  }, [url]);

  const handleOpenSafari = useCallback(() => {
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (!SAFE_PROTOCOLS.includes(parsed.protocol)) return;
    } catch {
      return;
    }
    setHistory((prev) => addToHistory(url, mediaInfo.type, prev));
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url, mediaInfo.type]);

  const handleScrollToGenerator = useCallback(() => {
    if (!url) return;
    setActiveTab("generator");
    setTimeout(() => {
      document
        .getElementById("generator-panel")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [url]);

  const handleHistorySelect = useCallback((selectedUrl: string) => {
    setUrl(selectedUrl);
    setActiveTab("generator");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-safari-deep text-safari-text font-sans selection:bg-safari-cyan/30 selection:text-white relative pb-20">
      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[50%] bg-safari-blue/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-safari-cyan/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-md mx-auto px-4 relative z-10 pt-safe">
        <Header />

        {/* URL Input */}
        <div className="mb-4">
          <label htmlFor="url-input" className="sr-only">
            URL or content
          </label>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL or content here..."
            className="w-full bg-safari-surface/80 border border-safari-cyan/20 rounded-xl px-4 py-3 text-safari-text placeholder-safari-text/40 focus:outline-none focus:border-safari-cyan focus:ring-1 focus:ring-safari-cyan/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all"
          />
        </div>

        <UrlSubmissionPanel
          url={url}
          mediaInfo={mediaInfo}
          onOpenSafari={handleOpenSafari}
          onScrollToGenerator={handleScrollToGenerator}
        />

        <QuickActionsBar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-2">
          {activeTab === "generator" && (
            <ShortcutGeneratorPanel
              url={url}
              shortcutName={shortcutName}
              shortcutIcon={shortcutIcon}
              onShortcutNameChange={setShortcutName}
              onShortcutIconChange={setShortcutIcon}
            />
          )}
          {activeTab === "history" && (
            <HistoryPanel history={history} onSelect={handleHistorySelect} />
          )}
          {activeTab === "templates" && <TemplatesPanel />}
        </div>
      </div>
    </div>
  );
}
