<p align="center">
  <img src="./public/logo.svg" alt="NOVARA Health Group logo" width="84" height="84" />
</p>

<h1 align="center">NOVARA Health Group</h1>

<p align="center">
  A responsive, bilingual health insurance website built with React, TypeScript, and Tailwind CSS.
</p>

## Overview

NOVARA Health Group is a frontend project that explores a modern digital experience for health insurance products and services. It brings product discovery, application journeys, customer self-service concepts, and company information together in a consistent web interface.

The website was independently designed and developed by **Gizem Öztürk** as part of the **E-Commerce-Anwendungen** course at **Universität Bremen** in 2026. The brand and insurance scenarios are fictional, with sample content used to demonstrate the interface.

## Features

- **Bilingual experience:** German and English content, navigation, and form labels.
- **Responsive design:** Layouts adapted for desktop, tablet, and mobile screens.
- **Insurance products:** Dedicated pages for different insurance plans and target groups.
- **Interactive application journeys:** Multi-step forms with client-side validation using React Hook Form and Zod.
- **Customer service interfaces:** Pages for appointments, claims, documents, and account-related workflows.
- **Additional sections:** Company information, careers, brokers, and support pages.
- **Accessibility preferences:** Adjustable text size, high-contrast options, and keyboard-friendly navigation components.
- **Optimized routing:** Page-level lazy loading and code splitting for more efficient initial loading.

## Tech Stack

| Category | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Styling and UI | Tailwind CSS 3, Radix UI, reusable components |
| Navigation | React Router 7 |
| Forms | React Hook Form, Zod |
| State and content | React Context, localStorage, mock data |
| Testing and tooling | Vitest, ESLint, TypeScript |
| Continuous integration | GitHub Actions |

## Getting Started

**Requirements:** Node.js 20 or later and npm.

Clone the repository:

```bash
git clone https://github.com/gizemoeztuerk/novara-health-group.git
cd novara-health-group
```

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open **http://localhost:8080/** in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run check` | Run type checking, linting, tests, and build |

## Project Structure

```text
novara-health-group/
├── .github/workflows/   # CI workflow
├── docs/                # Architecture and testing documentation
├── public/              # Public assets
├── src/
│   ├── a11y/            # Accessibility preferences
│   ├── components/      # Shared layout, forms, and UI
│   ├── data/            # Sample insurance content
│   ├── i18n/            # Language support
│   ├── pages/           # Route-level page components
│   └── test/            # Automated tests
└── package.json
```

Additional technical details are available in [Architecture](docs/ARCHITECTURE.md) and [Testing](docs/TESTING.md).

## Author

**Gizem Öztürk**

Website concept, UI design, and frontend implementation.

Developed independently within the university course project at Universität Bremen, 2026.
