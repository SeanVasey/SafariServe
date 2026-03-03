# Lessons Learned

Accumulated patterns from corrections and mistakes. Reviewed at the start of each session.

---

## 2026-03-03 — v1.2.0 Deployment Fix, Version Sync & README Overhaul

- **Always add `.nojekyll` to GitHub Pages sites**: GitHub Pages runs Jekyll by default, which can silently interfere with static file serving. Every non-Jekyll GitHub Pages site must include a `.nojekyll` file in the deploy root. Add it to `public/` so Vite copies it to `dist/`.
- **Use `process.env` directly in Vite config, not `loadEnv()`**: `loadEnv()` is designed for `.env` file loading and application-level env vars. For build-time config that reads system env vars (e.g., CI `BASE_PATH`), `process.env.VAR` is more direct and reliable. The `loadEnv` function introduces an unnecessary abstraction layer.
- **Always add `404.html` for SPAs on GitHub Pages**: GitHub Pages serves its own 404 page for unmatched routes. Copy `index.html` to `404.html` in the deploy step so the SPA handles all routes. This is critical for apps using query parameters (`?url=`), bookmarks, or client-side routing.
- **Verify deployments end-to-end, not just CI pass**: A successful GitHub Actions workflow doesn't guarantee the site works. Check (1) Pages source is set to "GitHub Actions" in repo settings, (2) the environment `github-pages` exists, (3) the site is actually accessible after deployment.
- **Version every CHANGELOG [Unreleased] section promptly**: Don't let deployment fixes or feature work accumulate in `[Unreleased]`. Cut a version (bump package.json, Header badge, tests) so the CHANGELOG reflects what's actually shipped.
- **Keep version badge in sync across 4 locations**: `package.json`, `Header.tsx` badge, test assertion in `App.test.tsx`, and `CHANGELOG.md` release heading. Miss one and you have a versioning bug.

## 2026-03-02 — GitHub Issues Fix Session

- **Duplicate entries in config files**: Always search for existing occurrences before adding new entries to `.gitignore` or similar config files. The `.DS_Store` entry appeared under both "IDE / Editor" and "OS files" sections.
- **Contact information in policy files**: `SECURITY.md` and `CODE_OF_CONDUCT.md` must include actionable contact details (email addresses), not vague references to "the maintainers". Reviewers and bots will flag this.
- **Project structure completeness**: When updating project structure diagrams in `README.md`, include all root-level config/dotfiles (`.editorconfig`, `.gitignore`) and the `README.md` itself. Alphabetical ordering within directory levels aids readability.

## 2026-03-02 — SafariServe v1.0 Implementation

- **React 19 + Testing Library**: `@testing-library/react` cleanup between tests can leave stale DOM elements. Use `getAllBy*` queries when elements may appear multiple times, and add explicit `afterEach(cleanup)` as a safety net.
- **Tailwind CSS 4**: Design tokens are defined via `@theme` in CSS using `--color-*` variables, not in `tailwind.config.js`. The `@import "tailwindcss"` replaces the old `@tailwind` directives.
- **Vite scaffold in non-empty dirs**: `create-vite` cancels when the target directory has existing files. Set up configs manually instead.

## 2026-03-02 — v1.1.0 Issue Fixes & Code Quality

- **ESLint 9 flat config**: The `--ext` flag is deprecated and ignored in ESLint 9 with flat config. Remove it from lint scripts; file filtering is handled in `eslint.config.js` via `files` patterns.
- **Dead code removal**: Don't ship unused exports (e.g., favorites CRUD was never wired up). Remove dead code rather than keeping "future" features; add them back when actually needed.
- **window.open security**: Always pass `noopener,noreferrer` as the third argument to `window.open()` to prevent reverse tabnapping.
- **URL protocol validation**: Validate URL protocol against a whitelist (`http:`, `https:`, `shortcuts:`) before opening. Never trust user input to `window.open()` — a `javascript:` URL would execute arbitrary code.
- **Clipboard API feedback**: The Clipboard API is async and may fail. Only show "Copied!" feedback in the `.then()` success handler, not unconditionally.
- **Semantic HTML**: Use `<header>`, `<ul>/<li>`, and `role="list"` for list elements with `list-none` to preserve VoiceOver list semantics.
- **Type safety over casts**: Prefer typed function signatures (`type: MediaType`) over runtime casts (`type as MediaType`). Catches misuse at compile time.
- **Non-functional UI elements**: Never render buttons/tabs that do nothing when clicked. Either implement them or remove them.

## 2026-03-02 — v1.1.1 Codebase Cleanup & Documentation Audit

- **`.gitignore` glob pitfall**: `.DS_Store?` does NOT match `.DS_Store` — the `?` wildcard matches exactly one character, so it only matches files like `.DS_StoreX`. Use `.DS_Store` (no wildcard) to match the actual macOS metadata file.
- **README project structure accuracy**: When documenting project structure, list ALL root-level files including build/config files (`index.html`, `package.json`, tsconfigs, vite/vitest configs, eslint config). Don't duplicate entries that already appear in the tree hierarchy (e.g., `ci.yml` was listed both inside `.github/workflows/` tree and again as a standalone root entry).
- **Stale task tracking**: Mark todo items as complete when their associated PRs are merged. Unchecked items in completed sessions create confusion about actual state.
- **Version consistency across files**: When bumping version, update ALL locations: `package.json`, Header component badge, test assertions that check the version string, and CHANGELOG.
