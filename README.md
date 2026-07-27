# AGIOne Documentation

[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)](https://nodejs.org/)
[![VitePress](https://img.shields.io/badge/VitePress-2.0.0--alpha.17-5c73e7)](https://vitepress.dev/)

This repository contains the AGIOne product documentation site, built with VitePress.

- English home: `/`
- Chinese home: `/zh-CN/`
- Source root: `docs/`
- Build output: `docs/.vitepress/dist/`

## Requirements

- Node.js `>= 20.19.0`
- npm, using the committed `package-lock.json`

## Common Commands

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

Local development uses `http://localhost:5173/` by default.

## Documentation Structure

| Section | English Path | Chinese Path |
| --- | --- | --- |
| Product Overview | `/product/` | `/zh-CN/product/` |
| Installation | `/installation/` | `/zh-CN/installation/` |
| Purchase & Activation | `/license/` | `/zh-CN/license/` |
| User Guide | `/userguide/` | `/zh-CN/userguide/` |
| User Manual | `/usermanual/` | `/zh-CN/usermanual/` |
| Best Practices | `/practices/` | `/zh-CN/practices/` |
| Operations | `/operations/` | `/zh-CN/operations/` |
| Others | `/others/` | `/zh-CN/others/` |

## Key Files

```text
.
├── docs/
│   ├── .vitepress/
│   │   ├── config/
│   │   │   ├── index.ts
│   │   │   └── shared.ts
│   │   └── theme/
│   │       ├── components/
│   │       │   └── ScenarioGuide.vue
│   │       ├── navbar/
│   │       │   ├── en.ts
│   │       │   ├── zh.ts
│   │       │   ├── en.main.ts
│   │       │   ├── zh.main.ts
│   │       │   ├── en.global.main.ts
│   │       │   └── zh.global.main.ts
│   │       └── sidebar/
│   │           ├── en.ts
│   │           └── zh.ts
│   ├── assets/
│   ├── public/
│   ├── index.md
│   └── zh-CN/
│       └── index.md
├── package.json
├── package-lock.json
└── README.md
```

## Navigation Maintenance

Sidebars are maintained directly:

- English sidebar: `docs/.vitepress/theme/sidebar/en.ts`
- Chinese sidebar: `docs/.vitepress/theme/sidebar/zh.ts`

Navbar files have two modes:

- Preview deployment uses `docs/.vitepress/theme/navbar/en.ts` and `zh.ts` directly.
- Production workflows may generate `en.ts` and `zh.ts` from the matching template files:
  - CN site: `en.main.ts`, `zh.main.ts`
  - Global site: `en.global.main.ts`, `zh.global.main.ts`

When adding or moving documentation, update both language versions and the related sidebar entries.

## Scenario Guide

The user guide scenario landing pages use `docs/.vitepress/theme/components/ScenarioGuide.vue` as the shared scenario data and UI source.

When adding a new scenario:

1. Create both English and Chinese scenario folders.
2. Add or update each scenario `index.md`.
3. Update `ScenarioGuide.vue`.
4. Update English and Chinese sidebars.
5. Run `npm run docs:build`.

## Content Rules

- Keep English and Chinese paths aligned.
- Do not commit real secrets, API keys, AK/SK, tokens, cookies, internal customer data, or real credentials.
- Use sanitized placeholders in examples and screenshots.
- Prefer relative Markdown links for nearby pages and images.
- For directory pages, use trailing-slash links such as `../target/` to avoid broken generated links.
- Keep image filename casing exactly aligned with Markdown references.

## Validation

Run the documentation build before submitting changes:

```bash
npm run docs:build
```

For navigation, link, or asset changes, also check:

- The affected page opens locally.
- The sidebar entry points to an existing page.
- Markdown image references match actual filename casing.
- Unused images are removed only after confirming they are not referenced by Markdown, config, or theme code.

## Deployment Notes

The repository includes GitHub Actions workflows under `.github/workflows/`.

- `main.yml` is used for the main documentation deployment.
- `preview.yml` is used for the preview documentation deployment.

Deployment-specific paths, hosts, and credentials are managed by GitHub Actions variables and secrets.
