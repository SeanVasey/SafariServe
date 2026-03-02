import type { HistoryEntry } from "../types";

const HISTORY_KEY = "safariServe_history";
const FAVORITES_KEY = "safariServe_favorites";
const MAX_HISTORY = 20;

export function loadHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryEntry[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function addToHistory(
  url: string,
  type: string,
  existing: HistoryEntry[],
): HistoryEntry[] {
  const entry: HistoryEntry = {
    url,
    type: type as HistoryEntry["type"],
    timestamp: Date.now(),
  };
  const updated = [entry, ...existing.filter((h) => h.url !== url)].slice(
    0,
    MAX_HISTORY,
  );
  saveHistory(updated);
  return updated;
}

export function loadFavorites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(url: string, favorites: string[]): string[] {
  const updated = favorites.includes(url)
    ? favorites.filter((f) => f !== url)
    : [url, ...favorites];
  saveFavorites(updated);
  return updated;
}
