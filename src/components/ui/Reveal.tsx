"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { dur, gsapEase, stagger as st } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
};

/** Fades its direct children up as the group enters the viewport. */
export function Reveal({ as: Tag = "div", children, className, y = 40, stagger = st.items, start = "top 85%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { motion } = useSite();

  useGSAP(
    () => {
      const el = ref.current;
      if (!motion || !el) return;
      gsap.from(el.children, {
        y,
        autoAlpha: 0,
        duration: dur.md,
        ease: gsapEase.out,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { dependencies: [motion], revertOnUpdate: true, scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
