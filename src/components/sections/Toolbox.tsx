"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { marquee } from "@/data/skills";
import { useSite } from "@/components/providers/SiteProvider";

const BASE = 40; // px per second

function Row({ items, outline }: { items: readonly string[]; outline?: boolean }) {
  return (
    <div className="overflow-hidden py-2 motion-off:overflow-visible motion-off:px-[var(--pad-x)]">
      <div data-row className="flex w-max gap-10 whitespace-nowrap motion-off:w-auto motion-off:flex-wrap motion-off:gap-x-8 motion-off:gap-y-2 motion-off:whitespace-normal">
        {[...items, ...items].map((t, i) => (
          <span
            key={`${t}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className={
              "display text-[clamp(2.5rem,6vw,5.5rem)] " +
              (outline ? "text-transparent [-webkit-text-stroke:1px_var(--ink-2)]" : "text-ink") +
              (i >= items.length ? " motion-off:hidden" : "")
            }
          >
            {t}
            <span className="ml-10 align-middle text-[0.45em] text-accent motion-off:ml-6" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two opposing rows; speed follows scroll velocity, hover pauses a row (MOTION.md §5). */
export function Toolbox() {
  const { motion } = useSite();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!motion || !ref.current) return;
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", ref.current);
      const state = rows.map((row, i) => ({ row, x: 0, dir: i === 0 ? -1 : 1, paused: false, speed: BASE }));
      const cleanups = state.map((s) => {
        const on = () => (s.paused = true);
        const off = () => (s.paused = false);
        s.row.addEventListener("pointerenter", on);
        s.row.addEventListener("pointerleave", off);
        return () => {
          s.row.removeEventListener("pointerenter", on);
          s.row.removeEventListener("pointerleave", off);
        };
      });

      const tick = (_t: number, dt: number) => {
        const v = getLenis()?.velocity ?? 0;
        const scrollDir = v < 0 ? -1 : 1;
        for (const s of state) {
          const target = s.paused ? 0 : BASE + Math.min(Math.abs(v) * 20, 600);
          s.speed += (target - s.speed) * 0.08;
          const half = s.row.scrollWidth / 2;
          s.x += s.dir * scrollDir * s.speed * (dt / 1000);
          s.x = gsap.utils.wrap(-half, 0, s.x);
          s.row.style.transform = `translate3d(${s.x}px,0,0)`;
        }
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        cleanups.forEach((c) => c());
        rows.forEach((r) => (r.style.transform = ""));
      };
    },
    { dependencies: [motion], revertOnUpdate: true, scope: ref },
  );

  return (
    <section className="border-t border-line py-20 md:py-28" aria-labelledby="toolbox-title">
      <div className="shell mb-8">
        <h2 id="toolbox-title" className="kicker">
          Toolbox
        </h2>
      </div>
      <div ref={ref} className="space-y-2">
        <Row items={marquee.top} />
        <Row items={marquee.bottom} outline />
      </div>
    </section>
  );
}
