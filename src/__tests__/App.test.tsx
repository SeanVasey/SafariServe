import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import App from "../App";

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

describe("App", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the header with branding", () => {
    render(<App />);
    expect(screen.getByText("VASEY/AI PRESENTS")).toBeInTheDocument();
    expect(screen.getByText("SafariServe")).toBeInTheDocument();
    expect(screen.getByText("v1.2.1")).toBeInTheDocument();
    expect(
      screen.getByText("Your gateway to Safari, from anywhere."),
    ).toBeInTheDocument();
  });

  it("renders the URL input field", () => {
    render(<App />);
    expect(screen.getByLabelText("URL or content")).toBeInTheDocument();
  });

  it("shows Awaiting Input status when no URL entered", () => {
    render(<App />);
    const matches = screen.getAllByText("Awaiting Input");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("detects media type when URL is entered", async () => {
    render(<App />);
    const input = screen.getByLabelText("URL or content");
    fireEvent.change(input, {
      target: { value: "https://www.youtube.com/watch?v=test" },
    });
    await waitFor(() => {
      expect(screen.getAllByText("Detected: Video").length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders quick action tabs", () => {
    render(<App />);
    expect(screen.getAllByText("Generator").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("History").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Templates").length).toBeGreaterThanOrEqual(1);
  });

  it("switches to history tab and shows empty state", () => {
    render(<App />);
    fireEvent.click(screen.getAllByText("History")[0]!);
    expect(screen.getByText("No history yet.")).toBeInTheDocument();
  });

  it("switches to templates tab and shows template cards", () => {
    render(<App />);
    fireEvent.click(screen.getAllByText("Templates")[0]!);
    expect(screen.getAllByText("Webpage").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Video").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Audio").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Document").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the shortcut generator panel by default", () => {
    render(<App />);
    expect(screen.getAllByText("Shortcut Generator").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Generated Steps").length).toBeGreaterThanOrEqual(1);
  });

  it("auto-populates shortcut name from URL domain", async () => {
    render(<App />);
    const input = screen.getByLabelText("URL or content");
    fireEvent.change(input, {
      target: { value: "https://github.com/user/repo" },
    });
    await waitFor(() => {
      const matches = screen.getAllByDisplayValue("Open github.com");
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });


  it("rejects non-http(s) URI schemes without rewriting them", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<App />);
    const input = screen.getByLabelText("URL or content");
    fireEvent.change(input, {
      target: { value: "mailto:test@example.com" },
    });

    fireEvent.click(screen.getAllByText("Open in Safari")[0]!);

    await waitFor(() => {
      expect(
        screen.getByText("Unsupported protocol. Use http or https."),
      ).toBeInTheDocument();
    });
    expect(openSpy).not.toHaveBeenCalled();

    openSpy.mockRestore();
  });

  it("keeps localhost:port inputs normalized to https", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<App />);
    const input = screen.getByLabelText("URL or content");
    fireEvent.change(input, {
      target: { value: "localhost:3000" },
    });

    fireEvent.click(screen.getAllByText("Open in Safari")[0]!);

    await waitFor(() => {
      expect(openSpy).toHaveBeenCalledWith(
        "https://localhost:3000",
        "_blank",
        "noopener,noreferrer",
      );
    });

    openSpy.mockRestore();
  });


  it("does not rewrite numeric non-http(s) schemes like tel:", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<App />);
    const input = screen.getByLabelText("URL or content");
    fireEvent.change(input, {
      target: { value: "tel:1234567890" },
    });

    fireEvent.click(screen.getAllByText("Open in Safari")[0]!);

    await waitFor(() => {
      expect(
        screen.getByText("Unsupported protocol. Use http or https."),
      ).toBeInTheDocument();
    });
    expect(openSpy).not.toHaveBeenCalled();

    openSpy.mockRestore();
  });
});
