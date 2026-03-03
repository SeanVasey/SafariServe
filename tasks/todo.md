# Task Plan

## Current Session: GitHub Pages Load Fix + Deployment Hardening

- [x] Review `tasks/lessons.md` and current repo state
- [x] Reproduce/triangulate deployment issue by auditing build and asset path configuration
- [x] Update Vite config to support subpath deployments (GitHub Pages) while preserving local/Vercel behavior
- [x] Fix PWA manifest paths/start URL for repo-subpath hosting
- [x] Add GitHub Pages deployment workflow with CI-compatible build + artifact publish
- [x] Update README deployment documentation for GitHub Pages and Vercel
- [x] Update CHANGELOG with deployment fix details
- [x] Run full verification suite (lint, typecheck, test, build)
- [x] Capture UI screenshot of running app (not applicable: no visual component changes)
- [x] Commit changes with conventional commit message

## Previous Session: v1.1.1 — Codebase Cleanup & Documentation Audit

- [x] Full codebase audit for merge conflicts, duplicates, and bad merges
- [x] Run all verification checks (lint, typecheck, tests, build)
- [x] Deep-read every file in the repository
- [x] Fix `.gitignore`: `.DS_Store?` glob doesn't match `.DS_Store` — changed to `.DS_Store`
- [x] Fix `README.md`: remove duplicate `.github/workflows/ci.yml` entry from project structure
- [x] Fix `README.md`: add missing root-level files to project structure
- [x] Fix `README.md`: add missing `apple-touch-icon.png` to public directory listing
- [x] Clean up stale unchecked item from previous v1.1.0 session
- [x] Update CHANGELOG with v1.1.1 fixes
- [x] Re-run all verification checks
- [ ] Commit and push to feature branch

## Previous Session: v1.1.0 — Issue Fixes & Code Quality

- [x] Fix Issue #3: Remove duplicate `.DS_Store` entry in `.gitignore`
- [x] Fix Issue #4: Add enforcement contact email to `CODE_OF_CONDUCT.md`
- [x] Fix Issue #5: Add `.editorconfig` and `.gitignore` to README project structure
- [x] Fix Issue #6: Add security contact email to `SECURITY.md`
- [x] Generate and add `apple-touch-icon.png` (180x180) for PWA iOS support
- [x] Add apple-touch-icon to PWA manifest icons
- [x] Fix URL protocol validation (prevent `javascript:` injection)
- [x] Fix `window.open` calls with `noopener,noreferrer`
- [x] Fix clipboard feedback bug in Shortcut Generator
- [x] Remove dead favorites code from storage utils
- [x] Fix deprecated ESLint `--ext` flag for flat config
- [x] Replace non-functional Share/Settings tabs with functional Generator tab
- [x] Use semantic `<header>` and `<ul>/<li>` elements
- [x] Add accessibility improvements (aria-labels, role="list")
- [x] Improve type safety in `addToHistory`
- [x] Update tests to match component changes (35 tests passing)
- [x] Update version to 1.1.0 (package.json, Header badge)
- [x] Update CHANGELOG with v1.1.0 release notes
- [x] Verify: lint (0 warnings), typecheck (clean), tests (35 pass), build (success)
- [x] Commit and push to feature branch

## Previous Session: SafariServe v1.0 Implementation

- [x] Initialize Vite + React 19 + TypeScript + Tailwind CSS 4 project
- [x] Configure Tailwind with SafariServe design tokens (cyan/teal/blue palette)
- [x] Implement types (`MediaInfo`, `HistoryEntry`, `TabId`)
- [x] Implement utilities (`detectMediaType`, `extractDomain`, `storage`)
- [x] Implement Header component (VASEY/AI branding)
- [x] Implement UrlSubmissionPanel (URL input, media detection, Safari relay)
- [x] Implement ShortcutGeneratorPanel (name, icon, steps preview, install/copy)
- [x] Implement QuickActionsBar (History, Templates tabs)
- [x] Implement HistoryPanel (localStorage-backed URL history)
- [x] Implement TemplatesPanel (media-type automation template cards)
- [x] Implement App root component (state management, URL param intake)
- [x] Add PWA manifest and favicon
- [x] Add ESLint 9 + TypeScript ESLint configuration
- [x] Add Vitest + React Testing Library test suite
- [x] Add GitHub Actions CI pipeline
- [x] Update README with full documentation
- [x] Update CHANGELOG with v1.0.0 release notes
- [x] Verify: lint (0 errors), typecheck (clean), tests (pass), build (success)
- [x] Commit and push to feature branch

## Repository Initialization

- [x] Create `CLAUDE.md` with engineering standards and workflow guidelines
- [x] Scaffold `tasks/` directory with `todo.md` and `lessons.md`
- [x] Create `.gitignore` with sensible defaults
- [x] Create `.editorconfig` for consistent formatting
- [x] Create `CHANGELOG.md` (Keep a Changelog format)
- [x] Create `SECURITY.md` with vulnerability reporting policy
- [x] Create `CODE_OF_CONDUCT.md` (Contributor Covenant)
- [x] Update `README.md` with proper structure and project description
- [x] Commit and push initialization to `claude/init-claude-md-ncO4c`


## Review

- Root cause identified: production bundle used `/` base, causing broken asset links on GitHub Pages subpath (`/SafariServe/`).
- Mitigation implemented: environment-driven Vite base + Pages-specific deploy workflow + relative manifest paths.
- Verification: local lint/typecheck/test/build and Pages-style build with `BASE_PATH=/SafariServe/`.
