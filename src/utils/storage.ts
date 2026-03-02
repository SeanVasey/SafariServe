import type { HistoryEntry, MediaType } from "../types";

const HISTORY_KEY = "safariServe_history";
const MAX_HISTORY = 20;

export function loadHistory(): HistoryEntry[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed as HistoryEntry[];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryEntry[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function addToHistory(
  url: string,
  type: MediaType,
  existing: HistoryEntry[],
): HistoryEntry[] {
  const entry: HistoryEntry = {
    url,
    type,
    timestamp: Date.now(),
  };
  const updated = [entry, ...existing.filter((h) => h.url !== url)].slice(
    0,
    MAX_HISTORY,
  );
  saveHistory(updated);
  return updated;
}
