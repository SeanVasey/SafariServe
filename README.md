<p align="center">
  <img src="docs/banner.svg" alt="SafariServe — The intelligent jumping-off point for your media" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/SeanVasey/SafariServe/actions/workflows/ci.yml"><img src="https://github.com/SeanVasey/SafariServe/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI"></a>
  <a href="https://github.com/SeanVasey/SafariServe/actions/workflows/deploy-pages.yml"><img src="https://github.com/SeanVasey/SafariServe/actions/workflows/deploy-pages.yml/badge.svg" alt="Deploy"></a>
  <img src="https://img.shields.io/badge/version-2.1.1-00D2FF?style=flat&labelColor=0A0E14" alt="Version 2.1.1">
  <a href="https://seanvasey.github.io/SafariServe/"><img src="https://img.shields.io/badge/demo-live-00B4D8?style=flat&labelColor=0A0E14" alt="Live Demo"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-FFB26B?style=flat&labelColor=0A0E14" alt="License"></a>
</p>

<p align="center">
  <strong>VASEY/AI Presents</strong> — The intelligent jumping-off point for your media.
</p>

---

<!-- TODO: Add a hero screenshot or screen capture of the app in use -->

## What is SafariServe?

SafariServe accepts content from **any source** — Brave, Chrome, Firefox, Share Sheet, automation workflows — and relays it to Safari via Apple Shortcuts. It serves as a single-purpose content clearinghouse with media-type detection, shortcut construction guides, and IFTTT automation integration.

## Features

- **Push to Safari** — Route any URL to Safari via the ForceSafari Apple Shortcut
- **Shared URL Intake** — Arrives pre-filled via the `?url=` query parameter from the Send to Serve shortcut
- **Media Type Detection** — Parses and validates URLs, classifying them as Video, Audio, Image, Document, or Article by hostname and file extension
- **Shortcut Construction** — Step-by-step guides for building Send to Serve, ForceSafari, and Save to Home Screen shortcuts
- **IFTTT Webhook Integration** — Configure your Maker event + key in-app (stored locally) and dispatch payloads to IFTTT automation workflows
- **Accessible** — WAI-ARIA tabs with keyboard navigation, visible focus outlines, and `prefers-reduced-motion` support
- **Animated Mesh Background** — Canvas-based electric cyan particle system with flowing ribbons
- **PWA** — Installable as a Progressive Web App on the Home Screen
- **Pipeline Flow** — Visual diagram: Brave → Send to Serve → SafariServe → ForceSafari → Safari

## Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Language   | JavaScript (JSX)                     |
| UI         | React 19                             |
| Styling    | Inline styles                        |
| Icons      | Inline SVG components                |
| Fonts      | Google Fonts (Outfit, Reddit Sans)   |
| Build      | Vite 6                               |
| Testing    | Vitest + React Testing Library       |
| Linting    | ESLint 9                             |
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

### Lint

```bash
npm run lint
```

### Regenerate icons

The PWA / favicon / home-screen PNGs in `public/` are generated from the SVG
sources (`safariserve-icon-ios.svg` for the styled app icon,
`src/assets/safariserve-icon.svg` for the transparent mark). Regenerate them
after changing either source:

```bash
npm run generate:icons
```

## Project Structure

```
SafariServe/
├── .github/workflows/
│   ├── ci.yml                  # CI pipeline (lint, test, build)
│   └── deploy-pages.yml        # GitHub Pages deployment workflow
├── docs/
│   └── banner.svg              # README header banner
├── public/
│   ├── .nojekyll               # Disables Jekyll processing on GitHub Pages
│   ├── apple-touch-icon.png    # iOS home screen icon (180×180, opaque)
│   ├── favicon.svg             # App icon — styled iOS/PWA icon (safariserve-icon-ios.svg)
│   ├── icon-192x192.png        # PWA manifest icon (192px, purpose "any")
│   ├── icon-512x512.png        # PWA manifest icon (512px, purpose "any")
│   ├── icon-512-maskable.png   # PWA maskable icon (512px, purpose "maskable")
│   └── manifest.json           # PWA manifest
├── scripts/
│   └── generate-icons.mjs      # Regenerates the PNG icons from the SVG sources
├── safariserve-icon-ios.svg    # Styled app-icon source (favicon + PWA + home screen)
├── src/
│   ├── __tests__/
│   │   └── App.test.jsx        # 18 component and interaction tests
│   ├── assets/
│   │   └── safariserve-icon.svg # Optimized transparent mark — in-app logo (?raw)
│   ├── test/
│   │   └── setup.js            # Test setup (jest-dom, canvas mock)
│   ├── App.jsx                 # Single-file application component
│   └── main.jsx                # React entry point
├── tasks/
│   ├── lessons.md              # Accumulated development lessons
│   └── todo.md                 # Active task tracking
├── .editorconfig               # Editor formatting rules
├── .gitignore                  # Git ignore rules
├── AGENTS.md                   # Agent instructions
├── CHANGELOG.md                # Project changelog
├── CLAUDE.md                   # Engineering standards
├── CODE_OF_CONDUCT.md          # Contributor Covenant
├── LICENSE                     # Apache License 2.0
├── README.md                   # This file
├── SECURITY.md                 # Vulnerability reporting
├── eslint.config.js            # ESLint 9 flat config
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite build configuration
└── vitest.config.js            # Vitest test configuration
```

## Design System

The UI follows the VASEY/AI dark-canvas glassmorphism aesthetic:

- **Background**: Near-black gradient with canvas-animated electric cyan mesh
- **Surfaces**: Liquid glass panels with `backdrop-filter: blur(48px) saturate(1.8)`
- **Accent**: Electric cyan (`#00E5FF`) with supporting coral, orange, and purple
- **Typography**: Outfit (headings) + Reddit Sans (body) from Google Fonts
- **Particles**: 80 pulsing, connected particles with radial glow effects
- **Animations**: Fade-up entrances, breathing ambient glows, flowing ribbons

## iOS Integration

SafariServe integrates with Apple Shortcuts via three shortcut templates:

1. **Send to Serve** (Share Sheet) — Accept URLs from any app, encode and relay to SafariServe
2. **ForceSafari** (Core Engine) — Receive text input and open it natively in Safari
3. **Save to Home Screen** — Use Safari's native Add to Home Screen from the share menu

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
