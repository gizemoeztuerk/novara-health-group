<p align="center">
  <img src="public/logo.svg" alt="NOVARA Health Group logo" width="76" height="76">
</p>

# NOVARA Health Group

**Responsive health insurance website · React / TypeScript · University frontend project**

NOVARA is a **fictional, bilingual health-insurance frontend prototype**, independently designed and implemented by **Gizem Öztürk** for the *E-Commerce-Anwendungen* course at **Universität Bremen (2026)**. The coursework was formally organized as a three-person assignment; **the website design and code in this repository are solely my work**.

> **Prototype notice.** No real insurance provider or backend is connected. Logins, applications, claim submissions, appointments, uploads, and contact requests are illustrative UI flows; they do not send or store information on a server. The full-width prototype banner is intentionally omitted from the interface; action-related demo notices remain visible next to simulated workflows. Use fictional test data only. Email addresses using the reserved `.example` domain are fictional.

## Features

- **Bilingual interface:** German and English navigation, content and form labels.
- **Insurance product exploration:** coverage and pricing examples for different audiences.
- **Multi-step application flows:** frontend form validation with React Hook Form and Zod; no real submission.
- **Self-service concepts:** appointment, document, claims and service screens.
- **Recruiting and partner pages:** job details, example application forms and broker information.
- **Accessibility options:** high-contrast preference, font-size controls and keyboard-accessible navigation.
- **Page-level code splitting:** lazy-loaded pages, so users download route-specific code as needed.
- **Automated checks:** TypeScript, ESLint, Vitest data-integrity tests and Vite build.

## Tech stack

| Purpose | Technologies |
| --- | --- |
| Web app | React 18, TypeScript, Vite |
| Styling | Tailwind CSS 3, Radix UI, shadcn-style reusable components |
| Routing | React Router 7 |
| Forms | React Hook Form, Zod |
| Data & state | Mock data, React Context, browser localStorage for UI preferences |
| Quality | TypeScript, ESLint, Vitest, GitHub Actions CI |

## Getting started

Install **Node.js 20+** and npm. Open a terminal **in the folder containing `package.json`**:

```bash
npm ci
npm run dev
```

The Vite dev server uses `http://localhost:8080` by default. No `.env`, credentials or external API are required.

### Checks before publishing

```bash
npm run typecheck   # TypeScript: noEmit
npm run lint        # ESLint (some Fast Refresh warnings may remain)
npm run test        # Vitest data-integrity tests
npm run build       # Vite production output to dist/
npm run preview     # Open the production build locally
```

Run `npm run check` to execute the first four checks consecutively. On Windows, PowerShell and CMD are both supported. **Do not include `node_modules/` or `dist/` in a Git commit.**

Further instructions are in [docs/TESTING.md](docs/TESTING.md).

## Project structure

```text
novara-health-group/
├── .github/workflows/ci.yml
├── docs/
│   ├── ARCHITECTURE.md
│   └── TESTING.md
├── public/               # SVG graphics used by the demo
├── src/
│   ├── a11y/             # accessibility preferences
│   ├── components/       # shared layout and UI components
│   ├── data/             # fictional product and service data
│   ├── i18n/             # German/English switching
│   ├── pages/            # lazy-loaded routes
│   └── test/             # data-integrity tests
├── package.json
├── package-lock.json     # committed for reproducible npm ci
└── vite.config.ts
```

## Architecture and limitations

This repository implements a frontend **case study**, not a production insurance platform. It has **no secure authentication, database, API, real customer accounts, payment processing, claims handling or email delivery**. Some illustrative controls have no actual persistence or backend action. The automated tests currently verify mock data and navigation data; they **do not** replace UI, accessibility or end-to-end tests.

The coursework discussed additional ideas (headless CMS, backend services, EU cloud infrastructure); these are **proposals**, not implemented features. See [architecture notes](docs/ARCHITECTURE.md).

### Dependency-security status

The last Windows-side dependency audit reported **13 advisories total** and **7 advisories with `npm audit --omit=dev`** after non-forced updates and React Router 7. These are dependency-tree findings, not confirmed exploitable flaws in the deployed frontend. The remaining findings involve Tailwind-related CSS processing and test/build tooling. Do not use `npm audit fix --force` without evaluating breaking upgrades. Re-run audits when installing the project because the advisory database changes.

## Authorship and use

- **Website design and implementation:** Gizem Öztürk (sole frontend developer)
- **University:** Universität Bremen
- **Course:** E-Commerce-Anwendungen · **Year:** 2026
- **Coursework format:** Three students were listed for the assignment; the website in this repository was built independently.
- **Published contents:** Website source, sample data and technical documentation only: no group brochures, presentations, handouts or contact details.

No open-source license is granted at this time. Third-party dependencies and assets retain their own licensing terms; verify redistribution and course-publication permissions before making the repository public.
