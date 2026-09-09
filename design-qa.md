## 2026-09-08 redesign in progress

Final result: blocked pending new visual selection. The user rejected the warm-paper draft before publication. Do not treat earlier QA below as acceptance for this redesign. Three new image directions have been submitted; implementation and public verification must follow the selected visual.

Functional changes are retained locally: extended pricing details/history, weekly bar views, original date presets/custom range, model comparison picker, model-family logos and project/maintainer assets. Data-level tests: 10 passed. Browser interaction and responsive acceptance are still pending for the final redesign. The homepage shortcut strip was removed at the user's request. No current-turn changes have been published to GitHub Pages.

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

## 2026-09-08 — Signal Studio cards and restored interactions

final result: passed for the selected visual and scoped interactions; full original-site parity is not claimed.

Source: design-options/2026-09-08/signal-studio-cards.png. Source and actual usage screenshot were viewed together at 1488×1058. Iterations corrected an inherited homepage padding override and Chinese navigation underline specificity. Hero copy, header and card edges now all measure 48px on desktop and 20px at 390px. Accurate platform scope, snapshot dates and proportional bar lengths take priority over generated mock copy/geometry.

Evidence: qa/final-signal/usage-desktop.png, home-mobile.png, usage-mobile.png, pricing-mobile.png, pricing-desktop-en.png. The desktop and mobile layouts were opened and inspected. No document overflow at 390px. The mobile chart scrolls within its own card to preserve model labels. No unresolved P0/P1/P2 visual defect in this scope. Physical-device and full assistive-technology testing were not performed.

Verified 1-week horizontal / 1-month stacked bars; comparison picker add/remove/reset; PNG download at 2162×1000; Hunyuan free prices; Qwen tier, official and third-party links and recorded history; CNY input 0.15, output 1.50 and blended 0.4875; English UI; both explanations open on load. Fixed header top remained 0 at scrollY 1456.5. No broken image resources or app-origin console errors (browser-extension warnings excluded). Automated data suite: 10/10 passed; production build passed. See functional-audit.md for remaining feature omissions.

## 2026-09-09 — Blue theme, concise branding and pricing scopes

final result: passed for this scoped annotation update.

Preserved the supplied screen structure and white cards while changing purple accents/chart colors to blue, rendering the existing glass artwork with a blue luminosity blend, reducing the homepage hero to its exact single requested slogan, and changing the brand to 企鹅智库 / PENGUIN INTELLIGENCE. Mobile hero wrapping was corrected after inspection; header, hero and cards retain shared margins. Both 390px home and pricing documents have scrollWidth 390. Fixed header and bilingual controls remain present.

Browser checks: Global/China tabs switch between426/193 rows and update the URL; search Mercury2.5 yields USD0.04 input /0.15 output with blended0.0675; global detail exposes the OpenRouter model link and unknown release/weights/history accurately. Changing to English preserves the China scope and193 rows. China historical data and details remain separate. Global CNY is explicitly an estimate using the reference exchange rate. Eleven data tests passed; production build passed. This is not a claim of complete original-site feature parity.

## 2026-09-09 — Compact wordmark and blue wave hero

Scoped visual check passed: Chinese wordmark reduced to 21px desktop, comparable to Tencent Technology lettering, with 7.45px compact English beneath. Actual rendered text widths: 89.35 / 89.02px desktop and 81.45 / 81.25px mobile, sharing the same left edge. Checked Chinese and English desktop home plus 390px mobile; no horizontal document overflow. New ChatGPT-in-Chrome wave background fits the home banner, with readable editable slogan; other page artwork stays intact. Screenshots: qa/wave-2026-09-09/home-desktop-zh.png and home-mobile-zh.png. Production build passed.

## 2026-09-09 — Shared wave ranking headers

Extended the approved home wave asset to benchmark, usage, pricing and open-source headers. Inspected all four desktop pages and usage at 390px (document width 390px). Darkened the small usage motto for contrast over the new artwork. Existing layouts, data and controls are preserved.

## 2026-09-09 — Hero supporting copy and matched brand height

Home now has the same eyebrow/headline/description hierarchy as ranking pages, with localized supporting text. Removed usage header decorative motto. Both publisher and Penguin lockup boxes measure 34px on desktop and 24px on mobile. Visually checked home in Chinese/English at 390px and desktop usage; mobile document has no horizontal overflow.

## 2026-09-09 — Supplied logo and equal home ranking cards

Replaced header lockup with exact user PNG and localized ranking label, optically aligned to its Chinese lettering. Removed the entire home hero. Home now uses equal ranking cards in project / usage / pricing order, with five-row previews and preserved full-list links. Verified 1055px desktop cards each 467.5×760px, mobile cards equal width and height; 390px Chinese/English document has no horizontal overflow. Inspected 612px header. Search rtk yields its existing rank 04; reloaded to clear the test query. Full standalone project rendering remains uncapped.

## 2026-09-09 — Consistent lower-left links and trend placement

Moved home project and trend full-ranking links to lower-left card footers; all four measured 25px from left and bottom on desktop. Removed home-only preview notice. Weekly trend now shares the second row with API prices (604×760px each at 1328px); benchmark remains a compact full-width card beneath. At 390px all four cards are 350×720px in the requested order and document scrollWidth is 390. ECharts renders inside its reduced card width with scrollable legend.
