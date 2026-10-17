# Taste article and explanatory artwork

## Scope and assumptions
- User approved the six-part editorial plan and four explanatory images for rinshid-note, not a book.
- Deliver a complete English article, 1,600–1,900 words (6–10 minutes), through the existing writing collection.
- Match the current warm paper, brown ink, terracotta and serif visual language. Use original local SVG illustrations, not external image requests or decorative AI stock imagery.
- User subsequently approved the headline “Everyone Is Learning AI. This Skill Sets You Apart.” and explicitly requested pushing and making the article live.
- Preserve the existing untracked engineering article and existing changes in tests/site.spec.ts.

## Contracts and flow
- New record: src/content/writing/taste-in-the-ai-era.md; title, slug, summary, type: article, language: en, tags, draft: false, featured: false, published: 2026-10-17. No series/book fields.
- Four figures reference /images/taste/*.svg, with explicit dimensions, informative alt text, lazy loading, and captions. Artwork uses self-contained cream backgrounds so it remains legible in both themes.
- Existing collection -> catalog -> writing page, home/archive/search, RSS and sitemap. No schema, route, shared layout or global-style changes.
- Body follows problem -> definition -> examples -> value and limits -> exercises -> conclusion. Hypothetical scenes are explicit; no invented biography, research claims or absolute forecasts.
- Missing assets or failed route/reading-time checks block completion; fix before handoff.

## Pre-decisions
- Revised after user feedback: create actual word-free editorial scenes, not text cards, annotated diagrams or checklists exported as images. Keep all explanations in HTML captions and article text.
- Four visual metaphors: selecting one print from many generated possibilities, finding a clear direction, shaping a clay vessel, and observing a leaf before drawing it. Use unified 640×520 canvases, warm limited colours and expressive linework.
- Keep artwork as warm notebook inserts in dark mode, not inverted graphics or theme-dependent external SVGs.
- Add regression checks to the existing site suite without changing its pre-existing assertions, because Playwright currently matches only site.spec.ts.

## Tasks and dependencies
1. Write the full six-section essay and integrate four captioned figures (owner: current agent).
2. Create four word-free local SVG illustrations and align captions/alt text with what they actually depict (owner: current agent; aligned with task 1).
3. Add feature tests for discovery, route, six-section navigation, 6–10 minute estimate, all four loaded images, RSS/sitemap inclusion and absence of series navigation (after 1–2).
4. Verify all four image figures at 320px and desktop, in light/dark, without horizontal overflow; check accessibility and capture screenshots (after 3).
5. Run check, build, output verification and existing Playwright regression suite. Review content and artwork; fix real issues before handoff.

## Acceptance and verification
- Article is discoverable as ordinary writing and has the requested narrative, examples, practical four-question exercise and memorable ending.
- Four original explanatory SVGs render with meaningful alt text/captions, visually clear subjects on mobile, no visible text, no text represented as paths and no external image dependencies.
- Build-time schema validation and production-output verification pass.
- New feature test would fail if the article or any illustration were removed; reading estimate is 6–10 minutes.
- Site tests pass and browser checks show no overflow or accessibility violations in either theme.
- No existing user content overwritten; no remote publication performed.

## Rollback
Remove only this article, its four assets and the added feature-test blocks. No migrations or runtime changes.

## Verification results
- Article: approximately 1,700 words including headings/captions, estimated 8-minute read.
- npm run check: 0 errors, warnings or hints.
- npm run build and npm run verify: passed; 25 output files and 297 internal links verified.
- After the word-free revision, npm test: all 14 tests passed, including the new check rejecting visible SVG text/text cards, discovery/reading path and light/dark image/accessibility checks at 320px/1440px.
- Manual visual check: all four replacement scenes inspected at desktop width and 320px; artwork uses warm paper rather than text panels. No clipping observed. Screenshots: .local/taste-word-free-mobile-1.png through -4.png.
- git diff --check: passed. Existing article and pre-existing test changes preserved.
- Local preview: http://localhost:4323/writing/taste-in-the-ai-era/; no commit, push or deployment performed.
- Independent review found one minor test issue: now match the reading-time span exactly so 16/110-minute estimates cannot accidentally pass the 6–10-minute check, and adjacent date text does not affect the match.
- Independent review of the word-free visual revision: SHIP. No further issues identified.

## Publication
- Publish only this article, its four illustrations, its plan and relevant tests. Exclude the pre-existing untracked engineering article and its unfinished tests.
- Preserve all pre-existing working-tree changes. Stage a production-ready test file with the new Taste tests and an archive assertion that uses the published Taste article rather than the unrelated local article.
- Validate the exact staged source in an ignored export before committing, then push main and verify the production title, figures, discovery and feeds.
- Exact staged release validated in .local/taste-release-20261017: check/build/verify passed (24 output files, 276 internal links); all 13 release tests passed without the unrelated engineering article.
