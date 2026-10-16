"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSite } from "@/components/providers/SiteProvider";

type Mode = "dot" | "link" | "view" | "hidden";
const SIZE: Record<Mode, number> = { dot: 8, link: 36, view: 88, hidden: 0 };

/**
 * Accent dot that trails the native cursor (never replaces it).
 * Elements opt into states with data-cursor="view" | "hidden"; links and buttons get the ring.
 */
export function Cursor() {
  const { motion } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [mode, setMode] = useState<Mode>("dot");
  const enabled = motion && finePointer;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    gsap.set(el, { opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) return setMode(tagged.dataset.cursor as Mode);
      if (t.closest("input, textarea, [contenteditable]")) return setMode("hidden");
      if (t.closest("a, button, [role=button], [role=tab]")) return setMode("link");
      setMode("dot");
    };
    const leave = () => {
      gsap.to(el, { opacity: 0, duration: 0.2 });
      shown = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = SIZE[mode];
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[95]">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[11px] uppercase tracking-wider text-accent-ink transition-[width,height,background-color,border-color] duration-300 ease-[var(--ease-out-soft)]"
        style={{
          width: size,
          height: size,
          background: mode === "link" ? "transparent" : "var(--accent)",
          border: `1px solid ${mode === "link" ? "var(--accent)" : "transparent"}`,
        }}
      >
        {mode === "view" && <span>View ↗</span>}
      </div>
    </div>
  );
}
