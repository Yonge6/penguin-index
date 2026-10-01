# Model usage profile

Use the supplied reference: a compact native dialog with model identity, four metric cards, metric-switchable weekly bars, milestones and summary. Table model names and Top 5 names open the same profile. The dialog scrolls internally, traps focus via native showModal, closes via Escape or the close button, and restores focus and page scrolling.

Metrics use the complete available snapshot history independent of the ranking period filter. Display the latest complete week and snapshot date explicitly. Incomplete observations remain visible with dashed bars but do not affect accumulated usage, growth, streaks or milestones. Missing observations remain null. Share uses the platform total; ranks compare recorded models. Release dates remain unavailable when not supplied by the dataset.

Validation: synthetic missing/partial-week fixtures, production bundle build, browser open/close and scroll readback. The source snapshot is dated; this is not a live data refresh.
