# Setup and testing guide

## Install and run

Open a terminal in the `novara-health-group` directory (the directory containing `package.json` and `package-lock.json`).

```powershell
npm ci
npm run dev
```

Open the local URL reported by Vite, normally `http://localhost:8080/`.

## Quality checks

```powershell
npm run check
```

The `check` script runs TypeScript type checking, ESLint, Vitest, and the production build in sequence. Alternatively, run them individually:

```powershell
npm run typecheck
npm run lint
npm run test
npm run build
npm run preview
```

**Last user-verified results (October 22, 2026, before this text-only cleanup):** TypeScript completed with no errors; ESLint reported 0 errors and 9 Fast Refresh warnings; all 4 mock-data integrity tests passed; the production build succeeded with page-level code splitting; and the Vite development server started successfully. These tests should be run again after changes.

## Manual browser checklist

- [ ] Homepage, product pages, service pages, and careers pages load successfully.
- [ ] English/German language switching displays consistent UI text.
- [ ] Career Starters plan links open `/products/career-starters/apply`.
- [ ] Required fields and consent checkboxes validate correctly.
- [ ] Each form clearly identifies that no real request is submitted or stored by a backend.
- [ ] Invalid career job paths display an error state rather than a blank screen.
- [ ] No horizontal overflow at 390px, 768px, and 1440px viewports.
- [ ] Keyboard navigation works with Tab and Enter.
- [ ] No unexpected application errors appear in the browser console.

## Dependency advisories

```powershell
npm audit
npm audit --omit=dev
```

The last Windows audit reported 13 dependency advisories overall and 7 from `npm audit --omit=dev`. This does not imply every advisory is exploitable in browser-delivered code. The remaining Tailwind-related findings require separate review; do not use `npm audit fix --force` without assessing breaking changes.

## Notes

- `node_modules/` and `dist/` are intentionally excluded from the repository and ZIP.
- Use fictional information only. This is a portfolio prototype with no real insurance services.
- Email addresses ending in `.example` are intentionally fictional.
- SPA deployments using BrowserRouter may require a fallback to `index.html` for direct route requests.
