"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { useSite } from "@/components/providers/SiteProvider";

/**
 * Hero name that alternates English → Devanagari in a line mask.
 * Both names share one grid cell, so the box always fits the wider one and nothing shifts.
 * Motion off: shows the Devanagari name, static.
 */
export function NameSwap({ start }: { start: boolean }) {
  const { motion } = useSite();
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!motion || !el) return;
      const [en, hi] = gsap.utils.toArray<HTMLElement>("[data-name]", el);
      // Start on English; Devanagari waits below the mask.
      // y: 0 discards the px offset GSAP parses from the CSS transform; yPercent carries the real offset.
      gsap.set(en, { y: 0, yPercent: 0 });
      gsap.set(hi, { y: 0, yPercent: 110 });
      if (!start) return;

      const swap = (out: HTMLElement, inn: HTMLElement) =>
        gsap
          .timeline()
          .to(out, { yPercent: -110, duration: 0.6, ease: "power4.inOut" })
          // immediateRender: false, or building the loop would push English below the mask straight away.
          .fromTo(inn, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", immediateRender: false }, 0.2);

      const tl = gsap.timeline({ repeat: -1, delay: 0.8 });
      tl.add(swap(en, hi), "+=1.6") // English holds, then → Devanagari
        .add(swap(hi, en), "+=2.6"); // Devanagari holds, then → English

      // Don't animate while the hero is off-screen or the tab is hidden.
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.resume() : tl.pause()));
      io.observe(el);
      return () => io.disconnect();
    },
    { dependencies: [motion, start], revertOnUpdate: true, scope: ref },
  );

  return (
    <p ref={ref} className="grid overflow-clip pb-[0.12em] leading-none">
      <span className="sr-only">{profile.name}</span>
      <span data-name aria-hidden className="display col-start-1 row-start-1 text-[2.25rem] italic motion-off:invisible md:justify-self-end">
        {profile.name}
      </span>
      <span
        data-name
        aria-hidden
        className="col-start-1 row-start-1 font-deva text-3xl text-ink [transform:translateY(110%)] motion-off:[transform:none] md:justify-self-end"
      >
        {profile.nameDeva}
      </span>
    </p>
  );
}
