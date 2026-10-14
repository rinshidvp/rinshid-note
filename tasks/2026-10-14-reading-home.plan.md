# Reading-first notebook

## Scope and decisions
- Apply to `rinshid-note.vercel.app`; keep the separate portfolio at `rinshid-portfolio.vercel.app`.
- Home and About show a short author bio, social platforms, and the portfolio link instead of skills, education, work history, project highlights, or milestones.
- Retain existing published project/Now routes and content for link compatibility; remove them from the primary navigation and homepage. Do not delete articles, publishing templates, RSS, translations, or reader features.
- No fabricated publications or new claims. Keep the intentional empty writing state.

## Backbone
- Site config owns the short bio and public links. Add Portfolio as a featured Connect link and feature Instagram along with existing socials.
- Shared shell renders the short identity plus the portfolio entry point, and includes all featured social links in the footer.
- Home leads into writing/guides/videos. About is a compact author introduction and link hub.
- Existing static Astro/content collection boundaries stay unchanged. No new models, endpoints, dependencies, or redirects.

## Execution and checkpoints
1. Update config, Home, About and Shell. Check types and static build before testing.
2. Update browser expectations for reading-first navigation; add assertions for short bio, absent resume sections, portfolio/social links and retained legacy routes. Run existing mobile accessibility/theme/draft tests plus publishing fixtures.
3. Update live smoke checks to match retained routes and new reading-first navigation. Verify output link integrity and draft exclusion.
4. Review independently, resolve real findings, push both repositories, verify production links and layouts.

## Acceptance and rollback
- Homepage has Writing as its main action and no Selected projects, past-work or milestone sections.
- About has a concise bio, all four social platforms and Portfolio; no detailed resume sections.
- Shared navigation emphasizes reading; Portfolio remains reachable from every page.
- Themes, 360px mobile layout, feeds, legacy routes and draft isolation still work.
- Revert only this change's commit to roll back; keep prior history and the portfolio repo untouched by notebook changes.
