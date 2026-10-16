# Abhayraj B: portfolio

Personal portfolio. Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP (ScrollTrigger, SplitText) · Lenis.

The design and motion specs are in [`docs/`](docs/): [CONTENT](docs/CONTENT.md) · [DESIGN](docs/DESIGN.md) · [MOTION](docs/MOTION.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck
```

## Edit content

All copy lives in typed data files, so you don't need to touch components:

| What | File |
|---|---|
| Name, headline, rotating words, stats, About text, email, socials | `src/data/profile.ts` |
| Featured projects + case studies, "More work" | `src/data/projects.ts` |
| Timeline (experience, education) and certifications | `src/data/experience.ts` |
| Capabilities tabs, process steps, toolbox marquee | `src/data/skills.ts` |

Common tasks:
- **Update your résumé:** replace `public/resume.pdf`. It's linked from the nav, hero, ⌘K palette, mobile menu and Contact. Set `resume: null` in `profile.ts` to hide every button.
- **Add a certification link:** set `href` on the entry in `experience.ts`.
- **Add a project screenshot:** drop a `.webp` (about 1600px wide) in `public/work/` and set `image` on the project. Projects without one get a typographic poster.
- **Domain:** defaults to `https://www.abhayrajb.in` (the apex redirects there); override with `NEXT_PUBLIC_SITE_URL`. It's used for canonical URLs, the sitemap and OG images.

## Structure

```
app/                   routes: home, /work/[slug], 404, OG image, sitemap, robots
src/components/
  sections/            Loader, Hero, About (pixel portrait), HowIWork, Work, Journey, Toolbox, Contact, Footer
  chrome/              Nav + mobile menu, ⌘K command palette, TransitionLink (view transitions)
  ui/                  SplitReveal, Reveal, CountUp, Magnetic, Cursor, ScrollProgress
  providers/           SiteProvider (theme, motion switch, intro, toasts), SmoothScroll (Lenis ↔ GSAP)
src/data/              all content
src/lib/               motion tokens, GSAP registration, Lenis store, helpers
```

## Behaviour notes

- **Motion switch** (nav, ⌘K): it defaults to `prefers-reduced-motion`. When off, there's no Lenis, loader, scrub, marquee or cursor, and all content is visible.
- **Theme:** it defaults to `prefers-color-scheme`. The choice is saved, and it's applied before first paint, so there's no flash.
- **Loader:** it plays once per browser session on `/` only.
- Vercel Analytics and Speed Insights only load when deployed. Locally their scripts 404, which is expected.
