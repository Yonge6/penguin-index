# Penguin Index · 企鹅智库｜榜单

A bilingual AI ranking website, built from the selected Signal Review design direction. React + Vite; self-hosted Inter and IBM Plex Mono; Phosphor icons; lazily loaded ECharts.

## Preview

```sh
npm ci
npm run dev -- --port 4173
```

`npm run build` emits the GitHub Pages client in `dist/client`. Relative asset paths work under the repository subdirectory. Query-based routes support direct links and refresh without a server rewrite.

## Features

- English and simplified Chinese, browser-language first visit and saved explicit preference.
- Home, upcoming benchmarks, model usage, API pricing, open-source rankings.
- Products / Skills / DSH, daily / weekly / monthly, search, language filters, saved projects and detail dialogs.
- Complete-week usage ranges, interactive chart, searchable model rankings and CSV export.
- Pricing provider and open-weight filters, currency selector, sorting, model details and CSV export.
- Source timestamps and methodology at the bottom. Mobile tables scroll within their container.

## Data boundary

This is a design preview backed by published source snapshots, **not a live ingestion service**. Model usage snapshot: 2026-09-07; pricing snapshot: 2026-08-18; GitHub snapshot: 2026-09-05T23:00:01.574Z. All actual dates are read from bundled data in the UI. The benchmark is not yet available. DSH monthly baselines are still accumulating.

Sources:
- https://kejunzheng.github.io/penguin-ranking-preview/
- https://mat1.gtimg.com/qqcdn/openrouterllm/model-trends/data/frontend-data.json

Star growth ordering is retained: positive growth only, descending growth, descending total stars, ascending repository ID, top ten. Source preview project links remain disabled during review. Descriptions have English translations; numeric source fields are unchanged. `scripts/localize-snapshots.mjs` applies translations if source snapshots are replaced.

Tencent Technology publisher logo was supplied by the project owner. The independent Penguin Index mark and Usage background were generated for the selected design. Branding is a redesign proposal; this repository does not claim to be the official production service.

## Verification

```sh
node --test tests/data.test.mjs
npm run build
```

See `design-qa.md` for browser and visual verification. GitHub Actions publishes `dist/client` to GitHub Pages on the default `codex/international-ui` branch.
