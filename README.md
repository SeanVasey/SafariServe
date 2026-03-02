# SafariServe

**VASEY/AI Presents** — Your gateway to Safari, from anywhere.

SafariServe is a single-purpose content clearinghouse that bridges the gap between non-Safari browsers (Brave, Chrome, Firefox) and Safari's exclusive iOS integration points. Accept content from any source, relay it to Safari, and generate media-type-aware Shortcuts for persistent Home Screen access.

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
| CI         | GitHub Actions                       |

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
├── public/
│   ├── favicon.svg           # App icon (compass rose motif)
│   └── manifest.json         # PWA manifest
├── src/
│   ├── __tests__/            # Test suites (App, detectMediaType, storage)
│   ├── components/
│   │   ├── Header.tsx        # VASEY/AI branding header
│   │   ├── UrlSubmissionPanel.tsx
│   │   ├── ShortcutGeneratorPanel.tsx
│   │   ├── QuickActionsBar.tsx
│   │   ├── HistoryPanel.tsx
│   │   └── TemplatesPanel.tsx
│   ├── utils/
│   │   ├── detectMediaType.ts  # URL → media type classification
│   │   └── storage.ts          # localStorage persistence layer
│   ├── types.ts              # Shared TypeScript types
│   ├── App.tsx               # Root application component
│   ├── main.tsx              # Entry point
│   └── index.css             # Tailwind imports + design tokens
├── .github/workflows/ci.yml  # CI pipeline
├── CLAUDE.md                 # Engineering standards
├── CHANGELOG.md              # Project changelog
├── CODE_OF_CONDUCT.md        # Contributor Covenant
├── LICENSE                   # Apache License 2.0
├── SECURITY.md               # Vulnerability reporting
└── tasks/
    ├── lessons.md            # Accumulated development lessons
    └── todo.md               # Active task tracking
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

## Contributing

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

This project is licensed under the Apache License 2.0 — see [LICENSE](LICENSE) for details.
