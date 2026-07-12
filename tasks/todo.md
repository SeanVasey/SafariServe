# Task Plan

## Current Session: Functionality & Design Improvements (v2.1.0)

- [x] Review repo for functionality/design gaps against README, lessons.md, and CLAUDE.md standards
- [x] Implement `?url=` query parameter intake (documented in README but missing)
- [x] Replace IFTTT `alert()` stub with real webhook config (localStorage) + dispatch with status feedback
- [x] Wire up non-functional "Save to Home Screen" button → opens Shortcuts tab guide
- [x] Harden media detection: URL parsing + hostname matching (no substring spoofing), reject non-http(s) schemes
- [x] A11y: ARIA tabs pattern with arrow-key navigation, aria-labels, focus-visible outlines, aria-hidden canvas
- [x] `prefers-reduced-motion`: static canvas frame + CSS animation opt-out
- [x] Canvas: devicePixelRatio-aware rendering, particles spawn across real dimensions
- [x] Add 15 tests for new behavior (33 total)
- [x] Bump version to 2.1.0 across package.json, badge, footer, test, banner.svg, README
- [x] Update CHANGELOG.md (fold long-lived [Unreleased] icon work into 2.1.0)
- [x] Verify: lint, test, build
- [ ] Commit and push, open draft PR

## Deferred

- Bundle size: the inline `?raw` icon SVG dominates the JS chunk (~599 kB minified / 188 kB gzip). Consider optimizing the SVG source (SVGO) or loading it as a static asset instead of inlining into the bundle.
- Consider a "Paste from clipboard" affordance next to the copy button for the manual iOS flow.
