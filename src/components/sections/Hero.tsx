"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { useSite } from "@/components/providers/SiteProvider";
import { useSectionLink } from "@/components/chrome/Nav";
import { CountUp } from "@/components/ui/CountUp";
import { Magnetic } from "@/components/ui/Magnetic";
import { RotatingWord } from "./RotatingWord";
import { NameSwap } from "./NameSwap";

export function Hero() {
  const { motion, introDone } = useSite();
  const ref = useRef<HTMLElement>(null);
  const [statsPlay, setStatsPlay] = useState(false);
  const sectionLink = useSectionLink();

  // Intro timeline (MOTION.md §3). Elements are hidden while the loader covers them, then revealed.
  useGSAP(
    () => {
      if (!motion) return;
      const q = gsap.utils.selector(ref);
      const kicker = SplitText.create(q("[data-hero-kicker]"), { type: "chars", mask: "chars", aria: "none" });
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(kicker.chars, { yPercent: 100, duration: 0.6, stagger: 0.012 }, 0.05)
        .from(q("[data-hero-line]"), { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0.15)
        .from(q("[data-hero-fade]"), { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.5)
        // The intro paragraph only slides: it stays painted (opacity 1) so it counts for LCP under the loader.
        .from(q("[data-hero-sub]"), { y: 24, duration: 0.8 }, 0.45)
        .add(() => setStatsPlay(true), 0.55)
        .from(q("[data-hero-stat]"), { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.55);
      if (introDone) tl.play();
      return () => kicker.revert();
    },
    { dependencies: [motion, introDone], revertOnUpdate: true, scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-end pb-10 pt-28 md:pb-14" aria-labelledby="hero-title">
      <div className="shell">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-12">
          <p data-hero-kicker className="kicker">
            {profile.kicker.join(" · ")}
          </p>
          <p data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-2">
            <span className="status-dot" />
            {profile.status}
          </p>
        </div>

        <h1 id="hero-title" className="display text-[length:var(--fs-mega)]">
          <span className="sr-only">
            {profile.headline.before} {profile.headline.rotating.join(", ")} {profile.headline.after}
          </span>
          <span aria-hidden className="block">
            {/* Lines are masked by hand: SplitText must not touch the React-managed rotating word */}
            <span className="mask">
              <span data-hero-line className="block">
                {profile.headline.before} <RotatingWord words={profile.headline.rotating} start={introDone} />
              </span>
            </span>
            <span className="mask">
              <span data-hero-line className="block">
                {profile.headline.after}
              </span>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12">
          <p data-hero-sub className="max-w-xl text-[length:var(--fs-lg)] leading-relaxed text-ink-2 md:col-span-7">
            {profile.sub}
          </p>
          <div data-hero-fade className="flex items-start justify-between md:col-span-5 md:flex-col md:items-end md:text-right">
            <NameSwap start={introDone} />
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{profile.coords}</p>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:mt-16 md:grid-cols-4">
          {profile.stats.map((s, i) => (
            <li key={s.label} data-hero-stat className="flex flex-col gap-1">
              <span className="font-mono text-[11px] text-muted">[{String(i + 1).padStart(2, "0")}]</span>
              <CountUp
                value={s.value}
                prefix={"prefix" in s ? s.prefix : ""}
                suffix={s.suffix}
                decimals={"decimals" in s ? s.decimals : 0}
                play={statsPlay}
                delay={i * 0.08}
                className="display text-[clamp(2.25rem,4vw,3.5rem)] tabular-nums"
              />
              <span className="text-sm text-ink-2">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                data-hero-fade
                {...sectionLink("work")}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink"
              >
                See selected work <span className="arrow">↘</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                data-hero-fade
                {...sectionLink("contact")}
                className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-accent"
              >
                Start a conversation <span className="arrow">↗</span>
              </a>
            </Magnetic>
          </div>
          <div data-hero-fade className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted md:flex">
            Scroll to discover
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 bg-ink motion-safe:animate-[scroll-cue_1.8s_var(--ease-out)_infinite] motion-off:hidden" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
