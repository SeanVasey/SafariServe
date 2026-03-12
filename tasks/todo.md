# Task Plan

## Current Session: SafariServe v2.0 — Complete Code Replacement

- [x] Update package.json (version 2.0.0, remove TS/Tailwind/Lucide deps, update scripts)
- [x] Delete old source files (components/, utils/, tests/, tsconfigs, CSS, types)
- [x] Write new App.jsx with single-file component (user-provided code)
- [x] Write new main.jsx entry point
- [x] Update build configs (index.html, vite.config.js, vitest.config.js, eslint.config.js)
- [x] Update CI workflow (remove typecheck step)
- [x] Write new test suite (18 tests covering rendering, tabs, media detection, shortcuts)
- [x] Update CHANGELOG.md with v2.0.0 release notes
- [x] Update README.md for v2.0 (tech stack, features, project structure)
- [x] Update tasks/todo.md and tasks/lessons.md
- [x] Verify: lint (0 warnings), test (18 pass), build (success)
- [x] Commit and push to feature branch
