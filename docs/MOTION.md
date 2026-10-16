# Motion & interaction spec

How everything moves. The design is in [DESIGN.md](DESIGN.md) and the copy is in [CONTENT.md](CONTENT.md).

**Rule of thumb:** use GSAP (+ ScrollTrigger, SplitText) for timelines, anything scroll-linked and JS-driven motion. Use plain CSS transitions/keyframes for component state (tabs, menu, toast, palette, preview card). Use Lenis for the scroll itself.

> **Build note (2026-10-17):** the first build also used Motion (`motion/react`) for component state. It was removed because it added a 142 KB chunk to the critical path, and everything it did is now GSAP or CSS. The scroll progress bar uses a CSS scroll-driven animation (`animation-timeline: scroll()`), so it needs no JS.

---

## 1. Tokens (`src/lib/motion.ts`)

```ts
export const ease = {
  out:     "cubic-bezier(.16, 1, .3, 1)",   // expo-out: reveals, entrances (Stéfano)
  outSoft: "cubic-bezier(.22, 1, .36, 1)",  // quint-out: UI, hovers (Sarthak + current site)
  inOut:   "cubic-bezier(.77, 0, .175, 1)", // quart-in-out: wipes, page transitions (Stéfano)
};
export const gsapEase = { out: "expo.out", outSoft: "power4.out", inOut: "power4.inOut" };

export const dur = { xs: .15, sm: .3, md: .6, lg: .9, xl: 1.2 }; // seconds
export const stagger = { chars: .02, words: .04, lines: .08, items: .06 };
```

| Use | Duration | Ease |
|---|---|---|
| Hover colour / opacity | `sm` | outSoft |
| Hover transform (row shift, arrow) | `sm`–`md` | outSoft |
| Text reveal (line mask) | `lg` | out |
| Section entrance | `md` | out |
| Wipes / page transitions | `lg` | inOut |
| Loader total | ≤ 1.6s | — |

Never animate `width`, `height`, `top` or `left`. Animate only `transform`, `opacity`, `clip-path` and `filter` (small blur only).

---

## 2. Smooth scroll (Lenis + GSAP)

```ts
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
- Anchor links call `lenis.scrollTo(target, { offset: -80, duration: 1.2 })`.
- Stop Lenis (`lenis.stop()`) while the mobile menu or command palette is open.
- With reduced motion or Motion off, **don't create Lenis**. Native scroll is used.

---

## 3. Load sequence (home, first visit)

One GSAP timeline, total ≈ 2.4s. Interactive at 0s, since nothing blocks input after the loader.

| t (s) | What |
|---|---|
| 0.00 | Loader visible: `अभयराज` fades up (y 20→0, opacity 0→1, `md`). Counter `000` starts. |
| 0.00–1.20 | Counter ticks to `100`, driven by `document.fonts.ready` + hero image decode. It has a 1.2s minimum and a 2.5s cap. |
| 1.20 | Loader panel `clip-path: inset(0 0 0 0) → inset(0 0 100% 0)` over `lg`, `inOut`. |
| 1.35 | Nav pill fades in, `y -12→0`. |
| 1.40 | Kicker: chars stagger in (`SplitText` chars, `y 100%→0` inside overflow mask, stagger `chars`). |
| 1.50 | H1 lines: line-mask reveal (`yPercent 110→0`, `lg`, `out`, stagger `lines`). |
| 1.90 | Stats strip: each `[0n]` item fades up and its number counts from 0 (`dur 1.0`, `power2.out`). |
| 2.10 | CTAs + "scroll to discover" fade in. The scroll cue's line loops (scaleY 0→1→0, 1.8s, infinite). |

Return visits in the same session (`sessionStorage` flag) skip the loader. The hero runs from t=1.35 with all delays −1.2s.

---

## 4. Hero rotating word

- The word slot is an inline-block with `overflow: clip`, and its width animates to the next word's measured width (Motion `layout`, `md`, `outSoft`).
- Out: the current word goes `yPercent 0 → -100`. In: the next word goes `yPercent 100 → 0` (`md`, `out`). Interval 2.4s.
- Pause while the tab is hidden (`visibilitychange`) or the hero is off-screen (IntersectionObserver).
- The final word `anything.` holds for 4s before looping.
- Screen readers get a static sentence (`aria-live="off"`, with a visually hidden full list).

---

## 5. Scroll-driven patterns (ScrollTrigger)

| Pattern | Where | Spec |
|---|---|---|
| **Section heading reveal** | Every `0n / TITLE` + H1 | SplitText lines, mask reveal `yPercent 110→0`, `lg`, `out`, `start: "top 80%"`, `once: true` |
| **Word-opacity scrub** | About statement | SplitText words, opacity `.15 → 1`, `scrub: true`, `start: "top 75%"`, `end: "bottom 45%"` |
| **Stat count-up** | Hero stats, CGPA | `gsap.to(obj, { val, snap: { val: 1 } })` (0.01 for CGPA), on enter, once |
| **Work rows enter** | Work index | Rows `y 40→0, opacity 0→1`, stagger `items`, `start: "top 85%"` |
| **Timeline fill** | Experience | 1px line `scaleY 0→1` (`transform-origin: top`), `scrub: .5`. Year labels turn accent when they cross centre. |
| **Marquee velocity** | Toolbox | Base speed 40px/s, `+ lenis.velocity * 2`, clamped; the direction flips with scroll direction; lerp back to base |
| **Parallax** | Portrait / case-study images only | `yPercent -8 → 8`, `scrub`. Never on text. |
| **Nav state** | Global | Past 100vh the pill shrinks slightly (`scale .96`) and the active section number turns accent |
| **Scroll progress** | Global | 1px line `scaleX` = progress |

Wrap all triggers in `gsap.matchMedia()` so reduced motion and mobile get their own simpler variants. Clean up with `useGSAP` scope.

---

## 6. Hover & pointer interactions (desktop, `(hover: hover) and (pointer: fine)` only)

| Element | Behaviour |
|---|---|
| **Cursor dot** | 8px accent dot, position lerp `0.18`. Over links → 32px ring with `mix-blend-mode: difference`. Over work rows → 88px pill labelled `View ↗`. Hidden over text inputs. Native cursor always stays visible. |
| **Work row** | Row text `x 0→16px` (`sm`), siblings `opacity → .4`, index number → accent, mono hover line slides in from `y 8px`. |
| **Work preview card** | Fixed 320×200 card follows the cursor (lerp `0.12`), with rotation tied to x-velocity (±6°). It scales `.8→1` and fades in on enter (`md`, `out`). Switching rows cross-fades the media (`clip-path` inset from the bottom). Muted videos only play while visible. |
| **Magnetic buttons** | CTAs, contact pill and socials. Translate up to 30% of the offset (max 12px), return with `elastic.out(1, .4)`, `lg`. |
| **Link underline** | `background-size: 0% 1px → 100% 1px` from the left on enter, and exits to the right (`sm`, `outSoft`). |
| **`↗` arrows** | `x/y 0 → 2px/-2px` on parent hover. |
| **Nav links** | Text roll: the label duplicates vertically and `yPercent 0 → -100` on hover (`sm`), which matches Sarthak's repeated-label effect. |
| **Scramble text** | Mono labels (`[01]`, kicker) scramble for 300ms on hover. Reuse the existing `ScrambleText`. |
| **Hover reveal lines** | Keep the existing `HoverReveal` personality lines on the name, education and work titles, restyled as small mono tooltips. |
| **Pixel portrait** | A `<canvas>` draws `portrait.webp` downsampled to N×N, then upscales with `imageSmoothingEnabled = false`. At rest N = 48. On hover, or once on scroll-in on touch devices, tween N 48 → 24 → 960 in steps (`steps(8)` feel: 48, 32, 24, 64, 128, 256, 512, full) over `lg`. The brief dip to 24 before resolving is a deliberate glitch. On leave it re-pixelates back to 48 (`md`). The caption counts `48px → 960px` in sync. Initial paint uses the static `portrait-pixel-48.png`, so there's no layout shift or blank canvas before JS. With Motion off it stays pixelated, and the real photo is in a `<noscript>` and in `alt`. |

Touch devices: no cursor, no magnetic effect, no preview card. Work rows show a static thumbnail, and tap targets are ≥ 44px.

---

## 7. Component & page transitions (Motion / View Transitions)

| Transition | Spec |
|---|---|
| **Tabs (How I work)** | The underline slides to the active tab (CSS `transform`/`width` transition, 500ms, outSoft). The panel fades up `y 8→0` (`.anim-fade-up`). |
| **Mobile menu** | Overlay `clip-path: circle(0% at top right) → circle(150%)` (`lg`, `inOut`). Links stagger in by line mask. Close reverses at 0.8× speed. |
| **Command palette** | Backdrop fades in. The panel goes `scale .96→1, opacity 0→1, y 8→0` (`.anim-pop-in`). Lazy-loaded after hydration. |
| **Theme toggle** | `document.startViewTransition` with a circular `clip-path` reveal from the toggle's position (`.6s`, `inOut`). Fallback is an instant swap. |
| **Home → case study** | View Transition. The work thumbnail has `view-transition-name: work-<slug>` and morphs into the case-study hero. Other content crossfades (`vt-in`/`vt-out` keyframes, `.5s`). Without VT support there is a plain fade. |
| **Toast ("Email copied ✓")** | Slides up from the bottom-centre, `y 20→0`, auto-dismisses after 2s. |
| **Status dot** | Pulsing ring, `scale 1→2.2, opacity .6→0`, 2s infinite. |
| **Grain** | Background-position `steps(6)` jitter, 1s infinite. Disabled with Motion off. |

---

## 8. Accessibility & the motion switch

- **Motion toggle** in the nav (Sarthak pattern), persisted in `localStorage`. The default follows `prefers-reduced-motion`.
- When **off / reduced**:
  - No Lenis, no loader, no scrub or parallax, no marquee movement (it becomes a static wrapped list), no cursor follower, no grain jitter, no rotating word (show `products`).
  - Reveals become a simple opacity fade (`sm`), or appear instantly.
  - View transitions fall back to an instant swap.
- Implement this once: a `MotionProvider` exposes `motionEnabled`, sets `data-motion="off"` on `<html>` for CSS, and feeds `gsap.matchMedia` conditions.
- Focus is never moved or hidden by animation. Animated text keeps its real DOM text (SplitText `aria` handling on, or `aria-label` on the parent).
- Respect `prefers-reduced-transparency`: solid nav background, no blur.

---

## 9. Performance rules

- Load GSAP plugins only on the client and register them once in the provider. Lazy-load SplitText per section.
- Every ScrollTrigger uses `once: true` unless it scrubs. Call `ScrollTrigger.refresh()` after fonts load.
- Videos: `preload="none"`, poster image, play only while hovered or in view, ≤ 1.5MB each, AV1/H.264 MP4.
- `will-change` only during an animation. Remove it on complete.
- Test on a throttled mid-range Android (Chrome DevTools 4× CPU). INP must stay < 150ms with the cursor follower active.
