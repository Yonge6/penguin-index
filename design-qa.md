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
- Console inspected: no application errors observed. Third-party Chrome extension warnings were excluded from application findings.
- Automated checks: six meaningful data/i18n tests pass; production build passes.

## Follow-up polish / test limits

P3: generated crescent curvature differs from the mock, as does small letter-spacing detail in the wordmark. Footer is intentionally an expandable, accurate source disclosure rather than the mock's unverified metadata.

Chart legend drag/pointer behavior and CSV download were implemented with ECharts/native download APIs but not exhaustively exercised across browsers. Mobile checks use browser viewport emulation, not a physical device. Data is bundled snapshots, not a live refresh service.
