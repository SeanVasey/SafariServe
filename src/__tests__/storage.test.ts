import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  loadHistory,
  addToHistory,
  loadFavorites,
  toggleFavorite,
} from "../utils/storage";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("storage utilities", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe("loadHistory", () => {
    it("returns empty array when no data", () => {
      expect(loadHistory()).toEqual([]);
    });

    it("parses stored history", () => {
      const data = [
        { url: "https://example.com", type: "Webpage", timestamp: 123 },
      ];
      localStorageMock.setItem("safariServe_history", JSON.stringify(data));
      expect(loadHistory()).toEqual(data);
    });

    it("returns empty array for invalid JSON", () => {
      localStorageMock.setItem("safariServe_history", "not-json");
      expect(loadHistory()).toEqual([]);
    });
  });

  describe("addToHistory", () => {
    it("adds new entry to front", () => {
      const result = addToHistory("https://a.com", "Webpage", []);
      expect(result).toHaveLength(1);
      expect(result[0]?.url).toBe("https://a.com");
      expect(result[0]?.type).toBe("Webpage");
    });

    it("deduplicates URLs", () => {
      const existing = [
        { url: "https://a.com", type: "Webpage" as const, timestamp: 100 },
      ];
      const result = addToHistory("https://a.com", "Webpage", existing);
      expect(result).toHaveLength(1);
      expect(result[0]!.timestamp).toBeGreaterThan(100);
    });

    it("caps at 20 entries", () => {
      const existing = Array.from({ length: 25 }, (_, i) => ({
        url: `https://${i}.com`,
        type: "Webpage" as const,
        timestamp: i,
      }));
      const result = addToHistory("https://new.com", "Webpage", existing);
      expect(result).toHaveLength(20);
    });
  });

  describe("loadFavorites", () => {
    it("returns empty array when no data", () => {
      expect(loadFavorites()).toEqual([]);
    });
  });

  describe("toggleFavorite", () => {
    it("adds new favorite", () => {
      const result = toggleFavorite("https://a.com", []);
      expect(result).toEqual(["https://a.com"]);
    });

    it("removes existing favorite", () => {
      const result = toggleFavorite("https://a.com", ["https://a.com"]);
      expect(result).toEqual([]);
    });
  });
});
