# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Confirmed product direction (2026-09-08)

The home page must expose actual ranking content for browsing, like the original ranking site; it must not be only a directory of navigation tiles. Preserve the selected black/white/acid-yellow design, bilingual controls and footer metadata. Home should include browsable open-source rankings plus model-usage and pricing summaries. Functional parity with the original site is a separate acceptance criterion from visual QA; explicitly report remaining omissions.

## Latest design correction (2026-09-08)

The user rejected the warm grey-green paper texture, heavy title and traditional dashboard feel as old-fashioned. Redesign toward a contemporary international technology/developer publication on a clean pale background. A fresh generated visual direction must guide the next implementation; the warm-paper draft has not been published. Preserve all functional additions already in progress: full price detail, original usage modes/date ranges and model selection, model logos and available project logos. Remove the home-jumps shortcut row as explicitly annotated. Original functional reference remains https://kejunzheng.github.io/penguin-ranking-preview/.

The user explicitly requires navigation to remain fixed at the top while scrolling on desktop and mobile. All redesigned directions must preserve this; compensate content and anchor offsets to avoid overlap.

## Selected visual target and refinement

The user selected the attached Signal Studio image (design-options/2026-09-08/signal-studio.png), then explicitly requested a very pale background plus refined white cards. Keep the single compact fixed top navigation, purple/blue/cyan chart colors, lavender glass hero, readable dark typography, 12px card corners, fine borders and light shadows. Use the generated lavender-glass.webp as the hero artwork. Preserve original functional behavior and precise bundled snapshot calculations; do not copy invented page-date labels, market-wide coverage claims, or distorted bar geometry from generated images.

The user also requires consistent horizontal spacing: align the fixed header, hero copy, ranking cards and footer to one shared content edge. Desktop gutter 48px (centered max-width 1440px), tablet 32px, mobile 20px. Hero artwork may bleed to the viewport edge, but its text must not.

Default both the usage data explanation and footer ranking methodology to expanded; users may still collapse them.

## 2026-09-09 corrections

Replace purple UI accents and chart colors with blue; keep pale canvas, white cards and fixed navigation. Home hero has exactly one slogan: 用数据看清 AI 浪潮的真实流向. Brand is 企鹅智库 without 榜单. Pricing has Global models / Chinese models tabs. Global uses the dated public OpenRouter Models API text-token snapshot (including Chinese providers on OpenRouter); China retains original direct-provider snapshot. Show their distinct source dates. Global CNY is an estimate using the stored reference exchange rate, not official CNY billing. Never fabricate release dates, weight licensing, or history when the API does not provide them.

The latest supplied logo reference sets the English wordmark to PENGUIN INTELLIGENCE. Apply this exact wording in both language modes, with 企鹅智库 as the Chinese name. The user requested the English wording, not replacement of the current penguin symbol.

Latest wordmark refinement: enlarge the Chinese name, tighten English letter/line spacing, and align both lines to the same visual width. Keep the Chinese-over-English logo lockup consistent in both language modes; localize the navigation and page content normally.

The user corrected the enlarged wordmark: Chinese text should be about the same visual size as the Tencent Technology Chinese lettering to its left, not oversized. Retain compact English aligned beneath. Replace the home hero art with a pale blue wave image generated using ChatGPT in Chrome, with quiet space behind the editable slogan.
