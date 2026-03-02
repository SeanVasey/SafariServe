# Lessons Learned

Accumulated patterns from corrections and mistakes. Reviewed at the start of each session.

---

## 2026-03-02 — SafariServe v1.0 Implementation

- **React 19 + Testing Library**: `@testing-library/react` cleanup between tests can leave stale DOM elements. Use `getAllBy*` queries when elements may appear multiple times, and add explicit `afterEach(cleanup)` as a safety net.
- **Tailwind CSS 4**: Design tokens are defined via `@theme` in CSS using `--color-*` variables, not in `tailwind.config.js`. The `@import "tailwindcss"` replaces the old `@tailwind` directives.
- **Vite scaffold in non-empty dirs**: `create-vite` cancels when the target directory has existing files. Set up configs manually instead.
