# QUALITY BAR — kantimohanthy.dev

Motion: design every animation together with its static alternative. Text is readable immediately. Pause continuous motion offscreen and when the tab is hidden; provide a pause control for the hero packet. Respect prefers-reduced-motion in CSS, JS, SVG and canvas. No scroll-jacking; natural scrolling and the standard cursor stay.

Accessibility (aim WCAG 2.2 AA; do not claim compliance from an automated scan): semantic landmarks and headings, skip link, visible focus, descriptive links, real buttons. Dialogs/popovers: Escape, focus containment where modal, focus restoration. Keyboard and touch tests for menu, evidence markers, artifact viewer, atlas graph and list, search. 200% zoom and 320px reflow. Comfortable 44px touch targets (preferred; check WCAG target-size minimums). Validate all colour pairs.

Performance: targets LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 when field data exists; report lab and field separately; a Lighthouse score proves neither field INP nor SEO. Record the baseline first. Budget: ≤ 250KB compressed first-load JS on the homepage, excluding lazy-loaded atlas; document any justified exception. No autoplay video or large shader libraries on first load. Optimised images with reserved dimensions; subset fonts; no layout shift. Graphics failure leaves a complete, readable page.

Testing the exported build (not the dev server): every internal link, direct load and refresh of every route on a static server, back/forward, focus order, reduced motion, no-JS narrative, missing-asset behaviour, graph/list equivalence, every evidence marker resolving to a ledger entry.

Visual review at 360, 390, 768, 1440px and 200% zoom: check surname wrapping, contrast, overflow, cramped controls, repeated layouts, distracting motion. Fix what you see; re-screenshot.

Data safety: scan the built output for secrets, tokens, private fields and every excluded name in PART 2; the build must fail if any appear. Report pre-existing unrelated failures separately; never weaken a check to make it pass.
