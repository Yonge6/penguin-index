# AI Trend Rankings refresh

Apply the user's annotated changes to the original Penguin Index deployment. The shared masthead presents AI 趋势榜 / AI Trend Rankings before the supplied Tencent Technology and Penguin Intelligence logo pair. Homepage ranking cards begin directly below the fixed header.

Use six navigation destinations: Home, Benchmarks, Model usage, Model pricing, Open source and Agent Skills. Benchmarks remains a coming-soon page. DSH is removed from selectors and route state; old DSH links normalize to Products.

All ranking headers share PageHeading: numbered English eyebrow, requested ranking name and one descriptive sentence. Usage no longer includes top-level source metadata or total/growth metrics. Each ranking's notes contain separate source, methodology and disclaimer sections, followed by actual dataset dates. Product and Skill copy remain distinct. Price notes report both global and Chinese dataset dates.

Responsive decisions: use two header rows at 1400px and below; at 760px and below place the intact publisher pair beneath the site name, with a 144px fixed header. Navigation scrolls horizontally on phones. Preserve card order, supplied logo assets, data, export behavior and 20-row pagination.

Validation: production build and 12 data tests pass; browser checked 1440px, 1217px and 390px, Chinese/English mastheads, shared headings, price pagination, structured notes and DSH legacy-link normalization. Public deployment requires independent UI readback.
