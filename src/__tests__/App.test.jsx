import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  window.history.replaceState({}, "", "/");
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("SafariServe")).toBeInTheDocument();
  });

  it("displays the hero tagline", () => {
    render(<App />);
    expect(screen.getByText(/intelligent jumping-off point/)).toBeInTheDocument();
  });

  it("displays the VASEY/AI branding", () => {
    render(<App />);
    expect(screen.getByText("VASEY/AI PRESENTS")).toBeInTheDocument();
  });

  it("renders three navigation tabs", () => {
    render(<App />);
    expect(screen.getByText("Route")).toBeInTheDocument();
    expect(screen.getByText("Shortcuts")).toBeInTheDocument();
    expect(screen.getByText("Automate")).toBeInTheDocument();
  });

  it("shows Route tab content by default", () => {
    render(<App />);
    expect(screen.getByText("Target Payload")).toBeInTheDocument();
    expect(screen.getByText("Workflow Actions")).toBeInTheDocument();
  });

  it("switches to Shortcuts tab", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Shortcuts"));
    expect(screen.getByText("Shortcut Construction")).toBeInTheDocument();
    // "Send to Serve" and "ForceSafari" appear in both the flow diagram and template cards
    expect(screen.getAllByText("Send to Serve").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("ForceSafari").length).toBeGreaterThanOrEqual(1);
  });

  it("switches to Automate tab", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Automate"));
    expect(screen.getByText("Automation Methods")).toBeInTheDocument();
    expect(screen.getByText("Webhook POST")).toBeInTheDocument();
    expect(screen.getByText("RSS Trigger")).toBeInTheDocument();
  });

  it("has a URL input field", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Paste media URL here...")).toBeInTheDocument();
  });

  it("detects video media type from YouTube URL", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Paste media URL here...");
    fireEvent.change(input, { target: { value: "https://youtube.com/watch?v=test" } });
    expect(screen.getByText("VIDEO")).toBeInTheDocument();
  });

  it("detects image media type from image URL", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Paste media URL here...");
    fireEvent.change(input, { target: { value: "https://example.com/photo.png" } });
    expect(screen.getByText("IMAGE")).toBeInTheDocument();
  });

  it("detects audio media type from Spotify URL", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Paste media URL here...");
    fireEvent.change(input, { target: { value: "https://spotify.com/track/123" } });
    expect(screen.getByText("AUDIO")).toBeInTheDocument();
  });

  it("detects document media type from PDF URL", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Paste media URL here...");
    fireEvent.change(input, { target: { value: "https://example.com/file.pdf" } });
    expect(screen.getByText("DOCUMENT")).toBeInTheDocument();
  });

  it("shows article type for generic URLs", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Paste media URL here...");
    fireEvent.change(input, { target: { value: "https://example.com/article" } });
    expect(screen.getByText("ARTICLE")).toBeInTheDocument();
  });

  it("expands shortcut template on click", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Shortcuts"));
    // Click the template button (the second "ForceSafari" is the card title)
    const elements = screen.getAllByText("ForceSafari");
    fireEvent.click(elements[elements.length - 1]);
    expect(screen.getByText("in Safari App")).toBeInTheDocument();
  });

  it("renders the version badge", () => {
    render(<App />);
    expect(screen.getByText("v2.1")).toBeInTheDocument();
  });

  it("renders Push to Safari button", () => {
    render(<App />);
    expect(screen.getByText("Push to Safari")).toBeInTheDocument();
  });

  it("renders IFTTT webhook button", () => {
    render(<App />);
    expect(screen.getByText("Trigger IFTTT Webhook")).toBeInTheDocument();
  });

  it("shows webhook config section in Automate tab", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Automate"));
    expect(screen.getByText("WEBHOOK CONFIG")).toBeInTheDocument();
  });
});

describe("Shared URL intake (?url=)", () => {
  it("pre-fills the input from the ?url= query parameter", () => {
    window.history.replaceState({}, "", "/?url=" + encodeURIComponent("https://youtube.com/watch?v=abc"));
    render(<App />);
    expect(screen.getByLabelText("Media URL")).toHaveValue("https://youtube.com/watch?v=abc");
    expect(screen.getByText("VIDEO")).toBeInTheDocument();
  });

  it("renders normally when no ?url= parameter is present", () => {
    render(<App />);
    expect(screen.getByLabelText("Media URL")).toHaveValue("");
  });
});

describe("URL validation", () => {
  it("flags unparseable input as invalid and disables Push to Safari", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "not a url" } });
    expect(screen.getByText("INVALID URL")).toBeInTheDocument();
    expect(screen.getByText("Push to Safari").closest("button")).toBeDisabled();
  });

  it("rejects javascript: scheme URLs", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "javascript:alert(1)" } });
    expect(screen.getByText("INVALID URL")).toBeInTheDocument();
    expect(screen.getByText("Push to Safari").closest("button")).toBeDisabled();
  });

  it("accepts bare domains by assuming https", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "example.com/article" } });
    expect(screen.getByText("ARTICLE")).toBeInTheDocument();
    expect(screen.getByText("Push to Safari").closest("button")).toBeEnabled();
  });

  it("is not fooled by media hostnames in query strings", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "https://evil.com/?ref=youtube.com" } });
    expect(screen.getByText("ARTICLE")).toBeInTheDocument();
  });

  it("classifies subdomains of media hosts correctly", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "https://open.spotify.com/track/123" } });
    expect(screen.getByText("AUDIO")).toBeInTheDocument();
  });
});

describe("Save to Home Screen", () => {
  it("opens the Shortcuts tab with the guide expanded", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Save to Home Screen"));
    expect(screen.getByText("Shortcut Construction")).toBeInTheDocument();
    expect(screen.getByText('"Add to Home Screen"')).toBeInTheDocument();
  });
});

describe("IFTTT webhook", () => {
  it("routes to the Automate tab when unconfigured", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "https://example.com" } });
    fireEvent.click(screen.getByText("Trigger IFTTT Webhook"));
    expect(screen.getByText("WEBHOOK CONFIG")).toBeInTheDocument();
  });

  it("saves webhook config to localStorage", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Automate"));
    fireEvent.change(screen.getByLabelText("IFTTT event name"), { target: { value: "safariserve_push" } });
    fireEvent.change(screen.getByLabelText("IFTTT Maker webhook key"), { target: { value: "test-key-123" } });
    fireEvent.click(screen.getByText("Save Config"));
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem("safariserve.webhook"))).toEqual({
      event: "safariserve_push",
      key: "test-key-123",
    });
  });

  it("dispatches the payload to the configured IFTTT endpoint", async () => {
    window.localStorage.setItem("safariserve.webhook", JSON.stringify({ event: "my_event", key: "my_key" }));
    const fetchMock = vi.fn().mockResolvedValue({});
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "https://example.com/page" } });
    fireEvent.click(screen.getByText("Trigger IFTTT Webhook"));
    expect(await screen.findByText("Payload dispatched")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      `https://maker.ifttt.com/trigger/my_event/with/key/my_key?value1=${encodeURIComponent("https://example.com/page")}`,
      { method: "POST", mode: "no-cors" },
    );
  });

  it("shows an error state when dispatch fails", async () => {
    window.localStorage.setItem("safariserve.webhook", JSON.stringify({ event: "my_event", key: "my_key" }));
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    render(<App />);
    fireEvent.change(screen.getByLabelText("Media URL"), { target: { value: "https://example.com/page" } });
    fireEvent.click(screen.getByText("Trigger IFTTT Webhook"));
    expect(await screen.findByText(/Dispatch failed/)).toBeInTheDocument();
  });
});

describe("Tab accessibility", () => {
  it("exposes ARIA tablist semantics", () => {
    render(<App />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Route");
  });

  it("moves between tabs with arrow keys", () => {
    render(<App />);
    const [routeTab] = screen.getAllByRole("tab");
    fireEvent.keyDown(routeTab, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Shortcuts" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Shortcut Construction")).toBeInTheDocument();
  });

  it("labels the copy button for screen readers", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Copy URL" })).toBeInTheDocument();
  });
});
