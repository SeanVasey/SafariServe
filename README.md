<p align="center">
  <img src="docs/banner.svg" alt="SafariServe — Your gateway to Safari, from anywhere" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/SeanVasey/SafariServe/actions/workflows/ci.yml"><img src="https://github.com/SeanVasey/SafariServe/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI"></a>
  <a href="https://github.com/SeanVasey/SafariServe/actions/workflows/deploy-pages.yml"><img src="https://github.com/SeanVasey/SafariServe/actions/workflows/deploy-pages.yml/badge.svg" alt="Deploy"></a>
  <img src="https://img.shields.io/badge/version-1.2.0-00D2FF?style=flat&labelColor=0A0E14" alt="Version 1.2.0">
  <a href="https://seanvasey.github.io/SafariServe/"><img src="https://img.shields.io/badge/demo-live-00B4D8?style=flat&labelColor=0A0E14" alt="Live Demo"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-FFB26B?style=flat&labelColor=0A0E14" alt="License"></a>
</p>

<p align="center">
  <strong>VASEY/AI Presents</strong> — A single-purpose content clearinghouse that bridges non-Safari browsers to Safari's exclusive iOS integration points.
</p>

---

## What is SafariServe?

SafariServe accepts content from **any source** — Brave, Chrome, Firefox, Share Sheet, automation workflows — and relays it to Safari. It also generates **media-type-aware Apple Shortcuts** for persistent Home Screen access, turning any URL into a one-tap Safari experience.

## Features

- **URL Relay** — Instantly open any URL in Safari from any browser
- **Media Type Detection** — Auto-classifies URLs as Webpage, Video, Audio, Image, Document, or App/Deep-Link
- **Shortcut Generator** — Create Apple Shortcuts with custom names and icons for Home Screen access
- **History** — Track recently submitted URLs with timestamps and media type badges
- **Automation Templates** — Pre-built shortcut templates for each media type
- **PWA** — Installable as a Progressive Web App on the Home Screen
- **URL Param Intake** — Auto-populates from `?url=` query parameters for Share Sheet integration

## Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Language   | TypeScript                           |
| UI         | React 19                             |
| Styling    | Tailwind CSS 4                       |
| Icons      | Lucide React                         |
| Build      | Vite 6                               |
| Testing    | Vitest + React Testing Library       |
| Linting    | ESLint 9 + TypeScript ESLint         |
| CI/CD      | GitHub Actions                       |
| Hosting    | GitHub Pages / Vercel                |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/SeanVasey/SafariServe.git
cd SafariServe
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

To build for GitHub Pages (repo subpath deployment), set `BASE_PATH`:

```bash
BASE_PATH=/SafariServe/ npm run build
```

### Test

```bash
npm run test
```

### Lint & Typecheck

```bash
npm run lint
npm run typecheck
```

## Project Structure

```
SafariServe/
├── .github/workflows/
│   ├── ci.yml                  # CI pipeline (lint, typecheck, test, build)
│   └── deploy-pages.yml        # GitHub Pages build + deployment workflow
├── docs/
│   └── banner.svg              # README header banner
├── public/
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   ├── apple-touch-icon.png    # iOS home screen icon (180x180)
│   ├── favicon.svg             # App icon (compass rose motif)
│   └── manifest.json           # PWA manifest
├── src/
│   ├── __tests__/              # Test suites (App, detectMediaType, storage)
│   ├── components/
│   │   ├── Header.tsx          # VASEY/AI branding header
│   │   ├── UrlSubmissionPanel.tsx
│   │   ├── ShortcutGeneratorPanel.tsx
│   │   ├── QuickActionsBar.tsx
│   │   ├── HistoryPanel.tsx
│   │   └── TemplatesPanel.tsx
│   ├── utils/
│   │   ├── detectMediaType.ts  # URL → media type classification
│   │   └── storage.ts          # localStorage persistence layer
│   ├── types.ts                # Shared TypeScript types
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind imports + design tokens
├── tasks/
│   ├── lessons.md              # Accumulated development lessons
│   └── todo.md                 # Active task tracking
├── .editorconfig               # Editor formatting rules
├── .gitignore                  # Git ignore rules
├── CHANGELOG.md                # Project changelog
├── CLAUDE.md                   # Engineering standards
├── CODE_OF_CONDUCT.md          # Contributor Covenant
├── LICENSE                     # Apache License 2.0
├── README.md                   # This file
├── SECURITY.md                 # Vulnerability reporting
├── eslint.config.js            # ESLint 9 flat config
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # TypeScript config for src/
├── tsconfig.node.json          # TypeScript config for build tooling
├── vite.config.ts              # Vite build configuration
└── vitest.config.ts            # Vitest test configuration
```

## Design System

The UI follows the VASEY/AI dark-canvas glassmorphism aesthetic:

- **Background**: Near-black (`#0A0E14`) with cyan/blue ambient glow
- **Surfaces**: Frosted glass panels with `backdrop-filter: blur()`
- **Accent**: Cyan (`#00D2FF`) → Teal (`#00B4D8`) → Blue (`#0077B6`)
- **Typography**: System fonts, high contrast on dark backgrounds
- **Interactions**: Soft glow indicators, active:scale-95 press feedback

## iOS Integration

SafariServe integrates with Apple Shortcuts via:

1. **Share Sheet Shortcut** — Accept URLs from any app, relay to SafariServe
2. **Direct Safari Relay** — Zero-UI instant open in Safari
3. **Home Screen Generator** — Create named, iconified shortcuts for the Home Screen

URLs can be passed via the `?url=` query parameter for automated workflows.

## Deployment

### GitHub Pages

The repository includes a dedicated deployment workflow (`.github/workflows/deploy-pages.yml`) that:

1. Builds with `BASE_PATH=/SafariServe/` for subpath deployment
2. Copies `index.html` to `404.html` for SPA fallback routing
3. Includes `.nojekyll` to prevent Jekyll interference
4. Deploys via `actions/deploy-pages@v4`

**Prerequisite**: In your repo settings, set **Settings > Pages > Source** to **"GitHub Actions"**.

### Vercel

Works with the default build command (`npm run build`) — no `BASE_PATH` override needed. Vercel serves from the root path automatically.

## Contributing

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

This project is licensed under the Apache License 2.0 — see [LICENSE](LICENSE) for details.
