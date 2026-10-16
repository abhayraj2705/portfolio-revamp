"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";
import { useSite } from "./SiteProvider";

/** Lenis synced to GSAP's ticker (MOTION.md §2). Not created when motion is off. */
export function SmoothScroll() {
  const { motion } = useSite();

  useEffect(() => {
    if (!motion) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [motion]);

  useEffect(() => {
    // Line breaks shift once webfonts land; re-measure every trigger.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return null;
}
