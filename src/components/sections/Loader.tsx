"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { useSite } from "@/components/providers/SiteProvider";

/**
 * First-visit loader (MOTION.md §3): Devanagari name + 000→100 counter, then a wipe up.
 * Never shown for return visits in the session, sub-pages or motion off (CSS hides it pre-paint).
 */
export function Loader() {
  const { finishIntro } = useSite();
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = document.documentElement;
      if (root.dataset.intro === "skip") {
        setGone(true);
        return;
      }
      root.style.overflow = "hidden";
      const counter = { v: 0 };
      gsap.from(nameRef.current, { y: 20, autoAlpha: 0, duration: 0.6, ease: "expo.out" });
      const count = gsap.to(counter, {
        v: 100,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      });
      const fontsReady = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
      let cancelled = false;
      Promise.all([count.then(), fontsReady]).then(() => {
        if (cancelled) return;
        finishIntro();
        root.style.overflow = "";
        gsap.to(ref.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => setGone(true),
        });
      });
      return () => {
        cancelled = true;
        root.style.overflow = "";
      };
    },
    { scope: ref },
  );

  if (gone) return null;

  return (
    <div
      ref={ref}
      data-loader
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-[var(--pad-x)]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        <span>{profile.name}</span>
        <span>Portfolio · 2026</span>
      </div>
      <p ref={nameRef} className="text-center font-deva text-[clamp(3rem,12vw,9rem)] leading-none">
        {profile.nameDeva}
      </p>
      <div className="flex items-end justify-between">
        <span ref={countRef} className="font-mono text-[clamp(2.5rem,8vw,6rem)] leading-none tabular-nums">
          000
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Loading</span>
      </div>
    </div>
  );
}
