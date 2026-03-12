import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

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
    expect(screen.getByText("v2.0")).toBeInTheDocument();
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
