# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Replace blurry `<img>`-based icon with inline `<svg>` loaded from file via Vite `?raw` import for crisp rendering at any size
- Replace old compass favicon with uploaded SafariServe Icon SVG
- Update PWA manifest to use transparent background so the icon reflects light/dark mode on iOS Home Screen
- Simplify PWA manifest to SVG-only icon (remove stale PNG variants that showed old design)
- Point apple-touch-icon to SVG favicon instead of deleted PNG

## [2.0.0] - 2026-03-12

### Changed

- Complete application rewrite as single-file React component
- Switch from TypeScript to plain JavaScript (JSX)
- Replace Tailwind CSS with inline styles
- Replace Lucide React icons with inline SVG components
- New canvas-based animated electric cyan mesh background
- New tab system: Route / Shortcuts / Automate
- New "Push to Safari" action via `shortcuts://` deep link to ForceSafari shortcut
- New IFTTT webhook integration (Automate tab)
- New expandable shortcut construction templates with step-by-step guides
- New flow diagram showing Brave → Send to Serve → SafariServe → ForceSafari → Safari pipeline
- Google Fonts (Outfit + Reddit Sans) loaded via inline style tag
- Liquid glass card UI with glassmorphism backdrop-filter effects

### Removed

- TypeScript compilation and type checking
- Tailwind CSS dependency and design token system
- Lucide React icon library dependency
- Multi-file component architecture (Header, UrlSubmissionPanel, ShortcutGeneratorPanel, QuickActionsBar, HistoryPanel, TemplatesPanel, CategoryIcons)
- Utility modules (detectMediaType, storage, iconRegistry)
- localStorage-backed history panel
- Vercel Speed Insights integration
- Previous test suite (replaced with new 18-test suite)

## [1.2.1] - 2026-03-03

### Fixed

- Fix URI normalization to detect any valid URI scheme (not only `scheme://`), preventing malformed rewrites like `https://mailto:...`
- Ensure unsupported non-HTTP(S) schemes (for example `mailto:`) are rejected by the Safari open flow instead of being opened as rewritten HTTPS URLs
- Add regression tests covering `mailto:` handling and preserving `localhost:port` normalization behavior

## [1.2.0] - 2026-03-03

### Fixed

- Fix GitHub Pages deployment — site was not loading due to missing `.nojekyll` file; Jekyll processing interfered with static asset serving
- Fix Vite base path configuration — use `process.env.BASE_PATH` directly instead of `loadEnv()` for reliable CI environment variable resolution
- Fix GitHub Pages asset pathing — make Vite base path configurable via `BASE_PATH` env var (defaults to `/` for local/Vercel)
- Fix PWA manifest pathing for subpath deployments by using relative icon URLs and `start_url: "."`
- Fix version consistency across all files (package.json, Header component, tests, CHANGELOG)

### Added

- Add dedicated GitHub Pages deployment workflow (`deploy-pages.yml`) with `BASE_PATH=/SafariServe/` and `actions/deploy-pages@v4`
- Add `.nojekyll` to `public/` to disable Jekyll processing on GitHub Pages
- Add SPA `404.html` fallback in deploy workflow (copies `index.html` to `404.html` for proper route handling)
- Add `@types/node` for typed `process.env` access in Vite config
- Add README header banner image and shields.io badges
- Add deployment documentation for GitHub Pages and Vercel in README

## [1.1.1] - 2026-03-02

### Fixed

- Fix `.gitignore`: `.DS_Store?` glob didn't match `.DS_Store` — the `?` wildcard requires one trailing character, so the actual `.DS_Store` file was never ignored
- Fix `README.md`: remove duplicate `.github/workflows/ci.yml` entry from project structure (listed both in tree and as standalone root entry)
- Fix `README.md`: add missing root-level files to project structure (`index.html`, `package.json`, tsconfig files, `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `README.md`)
- Fix `README.md`: add missing `apple-touch-icon.png` to public directory listing
- Fix `tasks/todo.md`: mark stale unchecked v1.1.0 item as complete (was already merged via PR #8)

## [1.1.0] - 2026-03-02

### Fixed

- Remove duplicate `.DS_Store` entry in `.gitignore` (#3)
- Add security contact email (`sean@vasey.audio`) to `SECURITY.md` (#6)
- Add enforcement contact email to `CODE_OF_CONDUCT.md` (#4)
- Add missing `.editorconfig` and `.gitignore` to README project structure (#5)
- Add missing `apple-touch-icon.png` (180x180) for PWA iOS support
- Fix clipboard feedback in Shortcut Generator — "Copied!" only shows on success
- Fix `window.open` calls to use `noopener,noreferrer` for security
- Add URL protocol validation to prevent `javascript:` injection
- Fix deprecated ESLint `--ext` flag for ESLint 9 flat config

### Changed

- Replace non-functional Share/Settings tabs with functional Generator tab in Quick Actions bar
- Use semantic `<header>` element in Header component
- Use semantic `<ul>/<li>` list elements in History panel
- Use stable `url` key instead of `timestamp` in History list rendering
- Add `role="list"` to generated steps list for VoiceOver compatibility
- Add `aria-label` to template buttons for screen readers
- Improve type safety: `addToHistory` now accepts `MediaType` instead of `string`
- Remove dead favorites code (`loadFavorites`, `saveFavorites`, `toggleFavorite`) from storage utils
- Make `saveHistory` private (internal implementation detail)
- Add non-array JSON guard to `loadHistory` parsing
- Add apple-touch-icon to PWA manifest icons array
- Update tests to match component changes (35 tests, all passing)

## [1.0.0] - 2026-03-02

### Added

- Full SafariServe application built with React 19, TypeScript, Tailwind CSS 4, and Vite 6
- VASEY/AI branded header with compass icon, version pill, and tagline
- URL submission panel with auto-detection of media types (Webpage, Video, Audio, Image, Document, App/Deep-Link)
- "Open in Safari" relay action via `window.open()`
- Shortcut Generator panel with customizable name, icon picker, and step-by-step preview
- "Install Shortcut" via `shortcuts://` deep link and "Copy Steps" clipboard action
- Quick Actions bar with History, Templates, Share, and Settings tabs
- History panel with localStorage persistence (max 20 entries)
- Automation Templates grid with pre-built media-type-specific cards
- URL parameter intake (`?url=`) for Share Sheet and automation integration
- Dark glassmorphism design system with cyan/teal/blue accents
- PWA manifest with standalone display mode
- Custom SVG favicon (compass rose with relay arrow)
- Vitest test suite across 3 files (App, detectMediaType, storage)
- ESLint 9 + TypeScript ESLint with zero-warning policy
- GitHub Actions CI pipeline (lint, typecheck, test, build)

## [0.1.0] - 2026-03-02

### Added

- Repository initialization with project standards (`CLAUDE.md`)
- Developer scaffolding: `.gitignore`, `.editorconfig`, task tracking
- `README.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`
