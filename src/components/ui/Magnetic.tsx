"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isFinePointer } from "@/lib/utils";
import { useSite } from "@/components/providers/SiteProvider";

/** Pulls its child toward the pointer (max ~12px) and springs back (MOTION.md §6). */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion } = useSite();

  useGSAP(
    () => {
      const el = ref.current;
      if (!motion || !el || !isFinePointer()) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      const clamp = gsap.utils.clamp(-12, 12);
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        yTo(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { dependencies: [motion], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
