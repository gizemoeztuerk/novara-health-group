# Architecture and project scope

This document separates the **running frontend prototype** from the **conceptual target architecture** discussed in the course materials.

## Implemented prototype

```text
Browser
  ├── React + TypeScript + React Router (pages and navigation)
  ├── Tailwind CSS and reusable UI components
  ├── React Hook Form + Zod (client-side forms and validation)
  ├── React Context (language and accessibility preferences)
  └── Local mock data (sample content; no real customer data)
```

- Routes are defined in `src/App.tsx`.
- Demo content and records are defined in `src/data/mockData.ts`.
- German and English interface handling is under `src/i18n`.
- Accessibility preferences are handled in `src/a11y`.
- Form submissions do not create real insurance contracts, claims or appointments.
- Authentication is a mock user interface; the project does not provide a secure authentication backend.

## Proposed production architecture (course concept only)

The accompanying university report described a composable architecture with four layers:

1. **Experience layer:** React + TypeScript, with SSR/SSG considered for content pages and client-side flows for highly interactive transactions.
2. **Content layer:** A headless CMS for editorial content, FAQs and downloads.
3. **Service layer:** Secure backend services for applications, contact requests, uploads and service processes.
4. **Integration layer:** Connections to a customer portal, application processing and monitoring/analytics systems.

The report also considered EU-based cloud infrastructure, secure storage, analytics subject to consent, and operational monitoring. **These items are architectural proposals, not implemented components of this repository.**

## Production considerations

A real healthcare/insurance system would require secure identity and access management, audited server-side workflows, consent handling, tested data deletion/retention policies, data encryption, authorization and legally reviewed privacy notices. This demonstration is **not suitable for processing real personal or medical information**.
