# Lessons Learned

Accumulated patterns from corrections and mistakes. Reviewed at the start of each session.

---

## 2026-03-02 — GitHub Issues Fix Session

- **Duplicate entries in config files**: Always search for existing occurrences before adding new entries to `.gitignore` or similar config files. The `.DS_Store` entry appeared under both "IDE / Editor" and "OS files" sections.
- **Contact information in policy files**: `SECURITY.md` and `CODE_OF_CONDUCT.md` must include actionable contact details (email addresses), not vague references to "the maintainers". Reviewers and bots will flag this.
- **Project structure completeness**: When updating project structure diagrams in `README.md`, include all root-level config/dotfiles (`.editorconfig`, `.gitignore`) and the `README.md` itself. Alphabetical ordering within directory levels aids readability.

## 2026-03-02 — SafariServe v1.0 Implementation

- **React 19 + Testing Library**: `@testing-library/react` cleanup between tests can leave stale DOM elements. Use `getAllBy*` queries when elements may appear multiple times, and add explicit `afterEach(cleanup)` as a safety net.
- **Tailwind CSS 4**: Design tokens are defined via `@theme` in CSS using `--color-*` variables, not in `tailwind.config.js`. The `@import "tailwindcss"` replaces the old `@tailwind` directives.
- **Vite scaffold in non-empty dirs**: `create-vite` cancels when the target directory has existing files. Set up configs manually instead.
