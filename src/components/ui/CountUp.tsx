"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Controlled start (hero intro). Omit to start on scroll. */
  play?: boolean;
  delay?: number;
  className?: string;
};

/** Renders the final number on the server; counts up from 0 on the client. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", play, delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const { motion } = useSite();
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!motion || !el || play === false) return;
      const obj = { n: 0 };
      el.textContent = format(0);
      gsap.to(obj, {
        n: value,
        duration: 1.1,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
        ...(play === undefined ? { scrollTrigger: { trigger: el, start: "top 90%", once: true } } : {}),
      });
      return () => {
        el.textContent = format(value);
      };
    },
    { dependencies: [motion, play], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
