# ContentFlow AI

Responsive, frontend-only SaaS prototype for local businesses in Kazakhstan. Built with React, TypeScript, Vite, Tailwind CSS and Lucide icons.

## Run locally

Requires Node.js 22+ and pnpm.

```sh
pnpm install
pnpm dev
```

```sh
pnpm test
pnpm build
```

## Included

- Russian landing page, generator, draft workspace, calendar and settings
- Russian and Kazakh template outputs, including bilingual plans
- Personalized business information, services, offers, audience and tone
- Editable text, titles, dates, formats, languages and visual concepts
- Alternative templates, delete with undo, search and filters
- Clipboard, UTF-8 TXT and CSV downloads
- Optional browser-local storage and data clearing
- Responsive layouts and accessible native dialogs

## Demo boundaries

Generation is local and template-based; no live AI API is connected. Business examples are fictional and clearly labeled. User-supplied descriptions/services/offers are preserved in their original language. Kazakh templates do not automatically translate user-provided facts. Review all drafts before publication.

No accounts, payments, automatic publishing, backend or data uploads. Images and fonts load from Unsplash and Google Fonts. Privacy and contact information are explicitly marked as pending.

## Extend

`src/generator.ts` contains the typed generation adapter. Replace it with a call to a server endpoint when adding a real AI provider; store credentials only on the server. `Draft.business` retains the source profile for consistent regeneration. Dates use Kazakhstan's Asia/Almaty timezone. All current persistence uses browser localStorage.
