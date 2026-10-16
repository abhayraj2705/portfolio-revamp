# Design system & build spec

The visual spec for the portfolio rebuild. Pair it with [CONTENT.md](CONTENT.md) for the words and [MOTION.md](MOTION.md) for the animation spec.

---

## 1. What we took from each reference

Research done 2026-10-17 by inspecting each site's shipped HTML/CSS/JS.

| | Sarthak Sharma (`sarthak-sharma-portfolio-six.vercel.app`) | Stéfano Girardelli (`stefanobg.com`, Awwwards nominee) | Jackie Zhang (`jackiezhang.co.za`) |
|---|---|---|---|
| **Stack** | Next.js (Turbopack), Motion | Astro + TypeScript, **GSAP + ScrollTrigger + Lenis** | Framer site + Lenis |
| **Type** | `Instrument Serif` display + `DM Sans` body + system mono | `Archivo Variable` for everything | Inter-based with playful accents (DM Sans, Geist Mono, hand fonts) |
| **Palette** | bg `#030303`, surface `#0b0b0b`, ink `#f1eee8`, muted `#aaa9a4`, accent `#ff8c59` | dark/light: paper `#141414`/`#fff`, ink `#fff`/`#141414`, accent `#e22356` | cream `#f2e3cf`, ink `#171717`, red `#e35342`, link blue `#0099ff` |
| **Signature moves** | Glass pill nav with backdrop blur · **"Motion off" toggle** · "Choose a perspective" tabs · `↗` link arrows · big stat row · "Still becoming" timeline · film grid | **Counter loader `000`** · numbered nav `01 Home 02 Work…` · headline with rotating word ("I design *interfaces* people remember") · stat labels `[01]` · numbered **work index list** `(07)` · film grain · **view-transition** page swaps · ease `cubic-bezier(.16,1,.3,1)` | Split-letter hero · **live local time** (`Cape Town • GMT+2`) · "3 things I strongly believe in" · casual first-person copy · "let's chat!" CTA |
| **We take** | Editorial serif+sans pairing, warm off-white ink on near-black, motion toggle, perspective tabs, timeline, a11y polish (`prefers-reduced-transparency` fallbacks) | Loader, numbered nav, rotating headline word, `[0n]` stats, work index list with hover preview, grain, view transitions, GSAP+Lenis stack | Personality: live clock, beliefs list, warm human copy |
| **We avoid** | Over-long pages, too many sections | Video-heavy payload (we have no reel yet) | Unfinished placeholder content |

**Our own signature (don't lose it):** the **Devanagari layer** (अभयराज · पुणे). No reference has this, and it makes the site unmistakably yours. Use it in the loader, hero and footer as a second typographic voice. Don't put it everywhere.

---

## 2. Direction

**"Editorial terminal."** A dark, type-led page. A large serif shows the voice, a clean sans carries the information, and mono shows the system. Use one warm accent and nothing else colourful. Every number is a real number. Motion is deliberate and slow-in/fast-out, and it never blocks reading.

Principles:
1. **Type is the hero.** No stock 3D blobs. Headlines at 8–12vw.
2. **One accent, used sparingly.** Use it for the rotating word, active states, the status dot and selection. Nothing else.
3. **Indexed everything.** Number the sections (`01–06`), work (`(07)`) and stats (`[01]`). It reads as an engineer's notebook.
4. **Real proof over adjectives.** Stats, outcomes and links come before descriptions.
5. **Calm by default, rich on intent.** Big motion appears on load and hover only. Scroll motion stays subtle.

---

## 3. Tokens

### Color (dark is default; light is the toggle)

```css
:root {                       /* dark */
  --bg:        #0a0908;       /* warm near-black */
  --surface:   #12100e;
  --surface-2: #1a1714;
  --ink:       #f1ece4;       /* warm off-white */
  --ink-2:     #c9c3b8;
  --muted:     #8a847a;
  --line:      #f1ece41f;     /* 12% ink */
  --accent:    #ff6a2b;       /* kesari, a saffron nod to the Devanagari layer */
  --accent-ink:#0a0908;       /* text on accent */
  --ok:        #4ade80;       /* status dot only */
}
[data-theme="light"] {
  --bg:#f4efe7; --surface:#ebe5db; --surface-2:#e2dbcf;
  --ink:#141210; --ink-2:#3a3631; --muted:#6f685e; --line:#1412101f;
  --accent:#e2531a; --accent-ink:#fff;
}
```
- Contrast: `--ink` on `--bg` is about 16:1, and `--muted` on `--bg` is ≥ 4.5:1 (verify with a checker after tuning).
- `::selection { background: var(--accent); color: var(--accent-ink); }`

### Typography

| Role | Font | Notes |
|---|---|---|
| Display | **Instrument Serif** (regular + *italic*) | Headlines and the rotating word in italic. `next/font/google`. |
| Body / UI | **Geist Sans** (or DM Sans) | 400/500. Never above 600. |
| Mono / labels | **Geist Mono** (or JetBrains Mono) | Kickers, indices, tags, dates. Uppercase + `letter-spacing: .08em` for kickers. |
| Devanagari | **Noto Serif Devanagari** 500 | Name, city, loader only. Subset to used glyphs. |

Fluid scale (`clamp`, 360 → 1440px):

| Token | Size | Use |
|---|---|---|
| `--fs-mega` | `clamp(3.5rem, 11vw, 11rem)` | Hero H1, contact headline. `line-height: .9; letter-spacing: -.03em` |
| `--fs-h1` | `clamp(2.5rem, 6vw, 5.5rem)` | Section titles |
| `--fs-h2` | `clamp(1.75rem, 3.2vw, 3rem)` | About statement, work titles |
| `--fs-lg` | `clamp(1.125rem, 1.4vw, 1.375rem)` | Lead paragraphs |
| `--fs-base` | `1rem` / 1.6 | Body |
| `--fs-sm` | `.8125rem` | Mono labels |

### Space, grid, radius
- 12-column grid, `max-width: 1440px`, gutter `clamp(16px, 2.5vw, 32px)`, side padding `clamp(16px, 4vw, 64px)`.
- Section rhythm: `padding-block: clamp(96px, 14vh, 200px)`.
- Radius: `2px` (cards), `999px` (pills). Mostly hairline borders (`1px var(--line)`), not boxes.
- Texture: an SVG noise **grain** overlay at 4–6% opacity, fixed, `pointer-events:none`.

---

## 4. Layout: page by page

### Global chrome
- **Nav** (fixed, top): left `AB / अ` monogram. Centre is a glass pill (`backdrop-filter: blur(16px) saturate(135%)`, solid fallback under `prefers-reduced-transparency`) holding `01 Work · 02 About · 03 Experience · 04 Contact`, with the number in mono-muted and the label in sans. The right side has the live clock `PUNE 14:32 IST`, `Motion: on/off`, a theme toggle and `⌘K`.
- Mobile: monogram + `Menu`. The menu is a full-screen overlay with giant serif links that stagger in.
- **Command palette** (`⌘K`): jump to sections, copy email, toggle theme/motion, open résumé. Keep the existing `CommandPalette` idea.
- **Cursor:** native cursor stays. A small accent dot follows it with lerp, on desktop and `pointer: fine` only. It grows into a "View ↗" label over work items. *Don't* use `cursor: none` globally (the current site does; it hurts a11y).
- **Scroll progress:** a 1px accent line under the nav.

### 00 · Loader (first visit per session only, ≤ 1.6s)
Black screen. A mono counter `000 → 100` sits bottom-left and `अभयराज` sits centre in Devanagari. The counter tracks real font/asset readiness and falls back to a timer. At the end the panel wipes up and reveals the hero.

### 01 · Hero (100svh)
```
FULL-STACK ENGINEER · AI SYSTEMS · PUNE, IN                 ● open to opportunities
I build *products*
people actually use.                                         पुणे / 18.52°N 73.85°E
──────────────────────────────────────────────────────────────────────────────
[01] 4+ apps shipped   [02] 10+ APIs   [03] ~40% fewer bad AI outputs   [04] 8.96 CGPA
See selected work ↘    Start a conversation ↗                       scroll to discover
```
- H1 in `--fs-mega` serif. The rotating word is *italic + accent*.
- `Abhayraj B ~ अभयराज` sits small above the kicker, or as the loader→hero handoff.

### 02 · About
- Left column (4 cols): kicker `02 / ABOUT` and a **pixelated portrait** (square, `image-rendering: pixelated`). It sits at rest as 48×48 pixel art and resolves to the real photo when hovered or when it scrolls into view. See MOTION.md §6. Beneath it is a mono caption `fig. 01 — abhayraj, 48px` that counts the resolution as it changes. The pixel look ties into the "engineer's notebook" voice and the loader counter.
- Right (8 cols): the statement paragraph at `--fs-h2`, revealed word by word on scroll.
- Under it, "Three things I believe" is a numbered list with hairline separators.

### 03 · How I work
- Tab row: `Product engineering / AI integration / Backend & infra` (Sarthak "perspective" pattern). The active tab has an accent underline that slides between tabs (`layoutId`).
- Panel: skill list in 2 columns plus a one-line philosophy.
- Below: a 3-step process as three columns with large mono numerals.

### 04 · Selected work `(07)`: 4 featured + 3 more
- **Index list** (Stefano): each row is `01 · IDEA · GenAI app builder · Next.js / GPT-4o · 2026 ↗`, full width, hairline-separated, with the title in `--fs-h2` serif.
- Hover (desktop): a floating preview card (16:10, screenshot or a muted loop video) follows the cursor with lerp. The row text shifts 16px right, other rows dim to 40%, and the hover line ("the one I'm most proud of.") appears in mono.
- Mobile: rows become stacked cards with a static thumbnail.
- Below: "More work" (GetMeAChai, SmartKeep, File Manager), numbered 05–07, as a compact mono list. These rows get a smaller hover preview card if a screenshot exists, then `All repos on GitHub ↗`.
- **Case study pages** `/work/[slug]`: MDX. The hero image morphs from the list thumbnail through a shared view transition.

### 05 · Experience & education ("Still becoming")
- A vertical timeline. Each year is a big mono label in the left column, with entries on the right. A 1px progress line on the left fills with accent as you scroll.
- Experience entries: role, org, dates and 2 bullets. Education card: degree, CGPA shown as a counted-up number.

### 06 · Toolbox (marquee)
- Two rows of tech names in mono, moving opposite ways. Speed reacts to scroll velocity. Hovering pauses a row. Keep the existing `TechMarquee` and upgrade it.

### 07 · Contact
- `Something good starts with a hello.` in `--fs-mega`, with the last word in accent italic.
- A large magnetic pill button holds the email. Click copies it and shows a toast.
- Row: LinkedIn ↗ · GitHub ↗ · Résumé ↗ · `PUNE 14:32 IST`.

### Footer
`© 2026 Abhayraj B` · `Built with intent in Pune` · `Back to top ↑`. Optionally a giant outlined `अभयराज` cropped at the bottom edge.

### 404
"This page wandered off." Big serif, a mono `404`, and a link home.

---

## 5. Tech stack (upgrade plan)

**Current:** Vite 8 + React 19 SPA, Tailwind 4, framer-motion 12, lucide-react.
**Recommendation: migrate to Next.js (App Router, latest stable) and keep React 19 + Tailwind 4.**

Why move off the Vite SPA:
- **SEO / sharing:** an SPA ships an empty HTML shell. Next pre-renders every page, which gives proper `<title>`, OG images (`next/og`), JSON-LD and a sitemap. That matters for a job-hunt portfolio.
- **Case-study routes** (`/work/[slug]`) with MDX and static generation.
- **`next/font`** self-hosts the four fonts with zero CLS, and **`next/image`** gives AVIF thumbnails.
- It matches your stated stack (you list Next.js on every project), and Vercel deploys come for free.

(Astro, which Stéfano uses, is the leaner alternative. It's a good choice if you'd rather keep near-zero JS, but you'd rewrite React-island patterns. Next keeps all your existing components.)

| Concern | Package | Why |
|---|---|---|
| Framework | `next` (App Router, Turbopack), `react@19`, TypeScript | SSG + routing + metadata |
| Styling | `tailwindcss@4` (CSS-first `@theme` tokens), `clsx`, `tailwind-merge` | Keep the current setup |
| Scroll | `lenis` | Smooth scroll, synced to GSAP's ticker |
| Timeline / scroll animation | `gsap` + `@gsap/react` (`useGSAP`), ScrollTrigger, **SplitText** | All GSAP plugins are free since 3.13 |
| Component animation | `motion` (the renamed `framer-motion`) | Layout animations, tab underline, menu, `AnimatePresence` |
| Page transitions | View Transitions API (React `<ViewTransition>` / Next's `viewTransition` flag), with a CSS fallback | Shared-element work → case study |
| Content | `@next/mdx` or `velite` | Case studies as MDX with typed frontmatter |
| Icons | `lucide-react` | Keep |
| Analytics | `@vercel/analytics` + Speed Insights | Free tier |
| Quality | ESLint flat config, Prettier, Lighthouse CI (optional) | |

Drop: WebGL/`three` scenes (not needed for this direction; they cost INP/LCP) and the global `cursor: none`.

**Migration path:** do it on a new branch. `npx create-next-app@latest` → move `src/components/*` to `app/_components` → move copy into `src/data/*.ts` (generated from CONTENT.md) → swap the `framer-motion` imports to `motion/react` → add GSAP/Lenis providers.

### Proposed structure
```
app/
  layout.tsx            fonts, theme script, Lenis + GSAP provider, grain, nav, cursor
  page.tsx              sections 01–07
  work/[slug]/page.tsx  case studies (MDX)
  opengraph-image.tsx
  not-found.tsx
  _components/          Nav, Loader, Hero, About, HowIWork, WorkIndex, Timeline, Marquee, Contact, Footer, CommandPalette, Cursor, Magnetic, SplitReveal
content/work/*.mdx
src/data/{profile,projects,experience,skills}.ts
src/lib/{motion.ts (eases/durations), useLocalTime.ts, useReducedMotion.ts}
public/{resume.pdf, work/*.avif, work/*.mp4}
```

---

## 6. Quality bar (definition of done)

- Lighthouse ≥ 95 on Performance, A11y, Best Practices and SEO (mobile).
- LCP < 2.0s, CLS < 0.02, INP < 150ms. JS budget < 180KB gz on the home route.
- Keyboard navigable, visible `:focus-visible` rings in accent, skip link, semantic landmarks, `alt` on every image.
- `prefers-reduced-motion` **and** the in-site Motion toggle both disable non-essential motion (see MOTION.md §8).
- Works at 360px with no horizontal scroll. Hover-only affordances get tap equivalents.
- Theme is set before paint (inline script) with no flash. The default follows `prefers-color-scheme`, then the stored choice.
