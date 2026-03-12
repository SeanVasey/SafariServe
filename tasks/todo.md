# Task Plan

## Current Session: Fix Blurry Icon — Inline SVG + PWA Transparent Background

- [x] Explore codebase and understand current icon rendering (img tag → favicon.svg)
- [x] Copy uploaded SafariServe Icon.svg to src/assets/ and public/favicon.svg
- [x] Replace CompassIcon `<img>` with inline `<svg>` via Vite `?raw` import
- [x] Update PWA manifest: transparent background, SVG-only icon, purpose: any
- [x] Remove stale PNG icons (apple-touch-icon.png, icon-192.png, icon-512.png)
- [x] Update index.html apple-touch-icon to reference SVG
- [x] Update CHANGELOG, README project structure, tasks
- [x] Verify: lint, test, build
- [x] Commit and push to feature branch
