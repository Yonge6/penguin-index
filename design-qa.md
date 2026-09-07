# Design QA — selected option 2

final result: passed

## Source and evidence

- Visual truth: `../design-options/international-v2/signal-review.png`, 1488 × 1058 pixels.
- Implementation: `qa/home-en-desktop.png`, 1488 × 1058 pixels, Chrome viewport 1488 × 1058 CSS pixels, DPR 1; Home / English / fully loaded / methodology collapsed.
- Reference and final screenshot were opened together in the same comparison tool input. Full-view comparison covers typography, publisher bar, brand, navigation, hero, benchmark strip, Usage panel, side entries and footer. Both are readable at this size, so separate focused crops were unnecessary; the brand, language control and footer were inspected directly in the full-resolution pair.
- Responsive evidence: `qa/home-en-mobile.png`, `qa/home-zh-mobile.png`, Chrome 390 × 844 CSS viewport, DPR 1, full-page captures. Mobile is a responsive adaptation: the selected mock only provides a desktop target.
- Usage: `qa/usage-desktop.png`, 1488 × 1058 CSS viewport. The interactive chart continues below the viewport.
- In-app browser produced an inconsistent screenshot scale and ignored the viewport override. The comparison therefore uses Chrome captures with confirmed CSS dimensions and DPR.

## Comparison history

1. `qa/home-en-before.png`: P2 — navigation began too far right, vertical spacing pushed the directory about 20px below the target, Usage headline was undersized.
2. Fixed desktop nav width, hero and benchmark spacing, headline sizing. Recaptured `qa/home-en-desktop.png` and compared with selected source. No remaining actionable P0/P1/P2 issues.
3. Functional review found Chinese-only source descriptions in English mode. Added English descriptions to all nine bundled project snapshots; regression checks verify no Chinese descriptions remain in English fields.

## Required surfaces

- Typography: self-hosted Inter closely matches the bold editorial sans; IBM Plex Mono for technical labels. Chinese system sans preserves readable weight and wrapping. Hero, section headings and navigation follow the selected hierarchy.
- Spacing/layout: 50px desktop gutters, layered publisher/brand/nav, asymmetric directory, dividing rules, no rounded-card UI. Chinese and English mobile layouts retain visible locale controls. Wide tables scroll within their own container; measured page width remains 390px, table area 354px, table width 710px.
- Colors: white, near-black, muted slate and acid yellow. Original Tencent logo retained from supplied asset. No dark theme drift.
- Assets: independently generated P/penguin mark and pale-crescent yellow background match the selected direction and render sharply. No CSS/SVG approximation of branded artwork. Phosphor library used for ordinary action icons.
- Copy: full Chinese and English UI, truthful source timestamps and source-derived numbers. Coming-soon benchmark and missing DSH monthly baseline remain explicit. Footer methodology replaces mock placeholder claims and fabricated update dates.

## Primary interactions checked

- Homepage navigation and both languages; benchmark destination and return path.
- Product weekly period, search for ponytail, save, saved-only filter, switch to Chinese: same route/period/query/favorite retained.
- Project detail dialog opens and closes.
- Skills monthly renders ten entries; DSH monthly shows baseline accumulation.
- Pricing DeepSeek provider filter and CNY selection retained on English switch; values remain CNY.
- Usage chart rendered, time range changed from 12 to 4 complete weeks, data totals and coverage updated.
- English and Chinese mobile homepage captures, mobile open-source table overflow contained.
- Source methodology expands through the footer link.
- Console inspected: an earlier Vite dependency refresh logged an invalid-hook error during hot reload; a full reload resolved it. Final local render and the deployed production origin show no application errors. Third-party Chrome extension warnings were excluded from application findings.
- Automated checks: six meaningful data/i18n tests pass; production build passes.

## Follow-up polish / test limits

P3: generated crescent curvature differs from the mock, as does small letter-spacing detail in the wordmark. Footer is intentionally an expandable, accurate source disclosure rather than the mock's unverified metadata.

Pricing CSV was downloaded in Chrome and its two filtered DeepSeek rows and currency were checked. Chart legend drag/pointer behavior is implemented with ECharts but was not exhaustively exercised across browsers. Mobile checks use browser viewport emulation, not a physical device. Data is bundled snapshots, not a live refresh service.

## Public acceptance

- Live: https://yonge6.github.io/penguin-index/
- Deployment run 34112921077, attempt 2: success. Initial attempt hit the newly created environment’s main-branch default; the actual source branch was added to the allowed deployment branches.
- Public home, assets and JSON returned HTTP 200; model and status snapshot SHA-256 hashes matched local files.
- Public English/Chinese switch, Products/Skills/DSH tables, Usage canvas (24 model rows), Pricing refresh (193 rows) passed. No production-origin console errors.
- Public screenshot: qa/live-zh-desktop.png.


## 2026-09-08 — Content-first homepage revision

final result: passed (homepage visual and scoped interaction QA only; functional parity is not passed)

User feedback supersedes the former directory layout: show browsable rankings on Home. Kept the publisher, penguin mark, bilingual navigation, editorial typography and black/white/acid palette. Replaced directory tiles with open-source Top 10, model-use and price summaries, plus a four-week trend chart. Shrunk the hero to bring content forward.

Compared the selected reference and new desktop capture together. The structural deviation is explicitly requested; no unresolved P0/P1/P2 layout issue within this homepage change. Initial mobile table required sideways scrolling for metrics; replaced it with stacked rows showing descriptions, growth and total stars. Current English and Chinese 390px layouts have document scrollWidth equal to viewport width. Browser viewport override restored.

Current-run evidence in qa/functional-audit-2026-09-08/: 10-home-content-local.png (English), 11-home-mobile-zh.png, 12-home-mobile-prices.png, 13-home-mobile-en.png, 14-home-desktop-zh.png, 15-home-chart.png. All accepted screenshots opened and visually inspected. Initial loading capture was replaced; 08-new-usage.png captured before chart load and is rejected as visual chart evidence.

Scoped interactions: Skills weekly, DSH monthly baseline state, bilingual state preservation, search, save/unsave, saved-only filter, project dialog, CNY pricing dialog, independent model summaries during project filtering, phone anchor navigation, rendered chart tooltip. Existing automated data tests and production build pass. Physical-device and exhaustive assistive-technology testing remain outside this check.

See functional-audit.md for original-site omissions. Prior visual acceptance was not a full parity audit.

### Public acceptance of the homepage revision

- Deployed commit b2416ae through successful GitHub Pages run 34147653807.
- Public HTML, JS, CSS, project JSON, model JSON and penguin mark return HTTP 200; fetched asset/data SHA-256 hashes match the local build.
- Actual public browser renders 10 project rows, 5 usage entries, 5 price entries and one chart canvas. Skills weekly remains selected when switching to English. Standalone Open Source still renders 10 rows. Restored the public preview to Chinese Home / Products / Daily.
- Current public screenshot: qa/functional-audit-2026-09-08/16-home-live.png, saved and inspected.
