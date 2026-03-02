# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.0] - 2026-03-02

### Fixed

- Remove duplicate `.DS_Store` entry in `.gitignore` ([#3](https://github.com/SeanVasey/SafariServe/issues/3))
- Add enforcement contact email to `CODE_OF_CONDUCT.md` ([#4](https://github.com/SeanVasey/SafariServe/issues/4))
- Update project structure diagram in `README.md` to include `.editorconfig`, `.gitignore`, and `README.md` ([#5](https://github.com/SeanVasey/SafariServe/issues/5))
- Add security contact email to `SECURITY.md` ([#6](https://github.com/SeanVasey/SafariServe/issues/6))

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
- Vitest test suite: 37 tests across 3 files (App, detectMediaType, storage)
- ESLint 9 + TypeScript ESLint with zero-warning policy
- GitHub Actions CI pipeline (lint, typecheck, test, build)

## [0.1.0] - 2026-03-02

### Added

- Repository initialization with project standards (`CLAUDE.md`)
- Developer scaffolding: `.gitignore`, `.editorconfig`, task tracking
- `README.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`
