"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn, isFinePointer } from "@/lib/utils";
import { featured, moreWork } from "@/data/projects";
import { profile } from "@/data/profile";
import { useSite } from "@/components/providers/SiteProvider";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { WorkMedia } from "./WorkMedia";

const total = String(featured.length + moreWork.length).padStart(2, "0");

export function Work() {
  const { motion: motionOn } = useSite();
  const [hovered, setHovered] = useState<number | null>(null);
  // The previously shown media stays visible underneath while the new one wipes over it.
  const [shown, setShown] = useState<number | null>(null);
  const [under, setUnder] = useState<number | null>(null);
  const show = (i: number) => {
    if (shown !== i) {
      setUnder(shown);
      setShown(i);
    }
    setHovered(i);
  };
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Preview card trails the cursor with lerp and tilts with horizontal velocity (MOTION.md §6).
  useGSAP(
    () => {
      const list = listRef.current;
      const card = previewRef.current;
      if (!list || !card || !isFinePointer()) return;
      const lerp = motionOn ? 0.5 : 0.01;
      const xTo = gsap.quickTo(card, "x", { duration: lerp, ease: "power3.out" });
      const yTo = gsap.quickTo(card, "y", { duration: lerp, ease: "power3.out" });
      const rTo = gsap.quickTo(card, "rotation", { duration: 0.6, ease: "power3.out" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        if (motionOn) rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
        lastX = e.clientX;
      };
      // Jump to the pointer on entry so the card never sweeps in from the corner.
      const enter = (e: PointerEvent) => {
        gsap.set(card, { x: e.clientX, y: e.clientY });
        lastX = e.clientX;
      };
      list.addEventListener("pointerenter", enter);
      list.addEventListener("pointermove", move);
      return () => {
        list.removeEventListener("pointerenter", enter);
        list.removeEventListener("pointermove", move);
      };
    },
    { dependencies: [motionOn] },
  );

  const markTransition = (el: HTMLElement | null, slug: string) => {
    if (el) el.style.viewTransitionName = `work-${slug}`;
  };

  return (
    <section id="work" className="section border-t border-line" aria-labelledby="work-title">
      <div className="shell">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="kicker mb-6">02 / Work</p>
            <SplitReveal id="work-title" className="display text-[length:var(--fs-h1)]">
              Selected work
            </SplitReveal>
          </div>
          <span className="font-mono text-sm text-muted">({total})</span>
        </div>

        <div ref={listRef}>
        <Reveal as="ol" className="border-t border-line" y={30}>
          {featured.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <TransitionLink
                href={`/work/${p.slug}`}
                data-cursor="view"
                onPointerEnter={() => show(i)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => show(i)}
                onBlur={() => setHovered(null)}
                onClick={(e) => {
                  const desktop = isFinePointer();
                  markTransition(
                    desktop ? previewRef.current : (e.currentTarget.querySelector("[data-thumb]") as HTMLElement),
                    p.slug,
                  );
                }}
                className={cn(
                  "group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 transition-opacity duration-300 md:py-9",
                  hovered !== null && hovered !== i && "md:opacity-40",
                )}
              >
                <span className={cn("col-span-2 font-mono text-xs transition-colors md:col-span-1", hovered === i ? "text-accent" : "text-muted")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-4 md:col-span-5">
                  <span className="display block text-[length:var(--fs-h2)] leading-none">
                    {p.title}
                    {p.tag && (
                      <span className="ml-3 rounded-full border border-line px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-ink-2">
                        {p.tag}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-ink-2">{p.kind}</span>
                </span>
                <span className="col-span-10 col-start-3 font-mono text-xs text-muted md:col-span-4 md:col-start-auto">
                  {p.stack.slice(0, 4).join(" / ")}
                </span>
                <span className="col-span-2 hidden text-right font-mono text-xs text-muted md:block">
                  {p.year} <span className="arrow">↗</span>
                </span>
                {/* Mobile thumbnail (desktop uses the floating preview) */}
                <span data-thumb className="relative col-span-12 mt-2 block aspect-[16/10] overflow-hidden rounded-[2px] md:hidden">
                  <WorkMedia project={p} sizes="100vw" />
                </span>
                <span className="col-span-11 col-start-2 hidden h-5 font-mono text-xs text-accent md:block">
                  <span className="inline-block translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    “{p.hover}”
                  </span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </Reveal>
        </div>

        {/* Floating preview (desktop, fine pointer) */}
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[65] hidden md:block"
          style={{ translate: "-50% -50%" }}
        >
          {/* All media stay mounted: the card scales in, and the active one wipes up over the rest */}
          <div
            className={cn(
              "relative h-[200px] w-[320px] overflow-hidden rounded-[3px] shadow-2xl transition-[opacity,scale] duration-400 ease-[var(--ease-out)]",
              hovered === null ? "scale-[0.8] opacity-0" : "scale-100 opacity-100",
            )}
          >
            {featured.map((p, i) => (
              <div
                key={p.slug}
                className={cn("absolute inset-0", shown === i && "transition-[clip-path] duration-500 ease-[var(--ease-out)]")}
                style={{
                  clipPath: shown === i || under === i ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                  zIndex: shown === i ? 1 : 0,
                }}
              >
                <WorkMedia project={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="kicker mb-6">More work</h3>
          <Reveal as="ul" className="border-t border-line" y={20}>
            {moreWork.map((p, i) => (
              <li key={p.slug} className="border-b border-line">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 py-5"
                >
                  <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">
                    {String(featured.length + i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-10 text-lg md:col-span-3">
                    <span className="u-link">{p.title}</span>
                  </span>
                  <span className="col-span-10 col-start-3 text-sm text-ink-2 md:col-span-5 md:col-start-auto">{p.oneLiner}</span>
                  <span className="col-span-10 col-start-3 font-mono text-xs text-muted md:col-span-3 md:col-start-auto md:text-right">
                    {p.year} <span className="arrow">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
          <a
            href={profile.socials.find((s) => s.label === "GitHub")!.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em]"
          >
            <span className="u-link">All repos on GitHub</span> <span className="arrow text-accent">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
