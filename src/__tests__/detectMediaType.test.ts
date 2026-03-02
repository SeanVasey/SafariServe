import { describe, it, expect } from "vitest";
import { detectMediaType, extractDomain } from "../utils/detectMediaType";

describe("detectMediaType", () => {
  it("returns None for empty string", () => {
    expect(detectMediaType("")).toEqual(
      expect.objectContaining({ type: "None" }),
    );
  });

  it("detects webpages for generic URLs", () => {
    expect(detectMediaType("https://example.com")).toEqual(
      expect.objectContaining({ type: "Webpage", shortcutPrefix: "🌐" }),
    );
  });

  it("detects video for YouTube URLs", () => {
    expect(
      detectMediaType("https://www.youtube.com/watch?v=abc123"),
    ).toEqual(expect.objectContaining({ type: "Video", shortcutPrefix: "🎬" }));
  });

  it("detects video for Vimeo URLs", () => {
    expect(detectMediaType("https://vimeo.com/123")).toEqual(
      expect.objectContaining({ type: "Video" }),
    );
  });

  it("detects video for direct mp4 files", () => {
    expect(detectMediaType("https://cdn.example.com/video.mp4")).toEqual(
      expect.objectContaining({ type: "Video" }),
    );
  });

  it("detects audio for mp3 files", () => {
    expect(detectMediaType("https://example.com/song.mp3")).toEqual(
      expect.objectContaining({ type: "Audio", shortcutPrefix: "🎵" }),
    );
  });

  it("detects audio for Spotify links", () => {
    expect(
      detectMediaType("https://open.spotify.com/track/abc"),
    ).toEqual(expect.objectContaining({ type: "Audio" }));
  });

  it("detects audio for Apple Music links", () => {
    expect(
      detectMediaType("https://music.apple.com/us/album/abc"),
    ).toEqual(expect.objectContaining({ type: "Audio" }));
  });

  it("detects images for jpg files", () => {
    expect(detectMediaType("https://example.com/photo.jpg")).toEqual(
      expect.objectContaining({ type: "Image", shortcutPrefix: "🖼️" }),
    );
  });

  it("detects images for png files", () => {
    expect(detectMediaType("https://example.com/icon.png")).toEqual(
      expect.objectContaining({ type: "Image" }),
    );
  });

  it("detects documents for PDF files", () => {
    expect(detectMediaType("https://example.com/report.pdf")).toEqual(
      expect.objectContaining({ type: "Document", shortcutPrefix: "📄" }),
    );
  });

  it("detects app/deep-link for Apple App Store links", () => {
    expect(
      detectMediaType("https://apps.apple.com/us/app/safari/id1146562112"),
    ).toEqual(
      expect.objectContaining({ type: "App/Deep-Link", shortcutPrefix: "📱" }),
    );
  });

  it("detects app/deep-link for shortcuts:// URLs", () => {
    expect(detectMediaType("shortcuts://run-shortcut?name=test")).toEqual(
      expect.objectContaining({ type: "App/Deep-Link" }),
    );
  });

  it("handles URLs with query parameters on media extensions", () => {
    expect(
      detectMediaType("https://example.com/video.mp4?token=abc"),
    ).toEqual(expect.objectContaining({ type: "Video" }));
  });
});

describe("extractDomain", () => {
  it("extracts domain from a valid URL", () => {
    expect(extractDomain("https://www.example.com/path")).toBe("example.com");
  });

  it("strips www prefix", () => {
    expect(extractDomain("https://www.google.com")).toBe("google.com");
  });

  it("returns domain without www if absent", () => {
    expect(extractDomain("https://github.com/user/repo")).toBe("github.com");
  });

  it("returns 'Link' for invalid URLs", () => {
    expect(extractDomain("not-a-url")).toBe("Link");
  });

  it("returns 'Link' for empty string", () => {
    expect(extractDomain("")).toBe("Link");
  });
});
