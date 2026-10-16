"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { dur, gsapEase, stagger } from "@/lib/motion";
import { useSite } from "@/components/providers/SiteProvider";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "lines" = masked line reveal, "words" = word-by-word opacity scrub */
  mode?: "lines" | "words";
  id?: string;
};

/** Line-mask reveal on scroll, or a scrubbed word-opacity reveal (MOTION.md §5). */
export function SplitReveal({ as: Tag = "h2", children, className, delay = 0, mode = "lines", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { motion } = useSite();

  useGSAP(
    () => {
      const el = ref.current;
      if (!motion || !el) return;
      // aria-label is only valid on elements with a role (headings); plain text keeps its real words.
      const aria = /^H[1-6]$/.test(el.tagName) ? "auto" : "none";
      if (mode === "lines") {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: dur.lg,
              ease: gsapEase.out,
              stagger: stagger.lines,
              delay,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            }),
        });
      } else {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          aria,
          onSplit: (self) =>
            // Rests at 0.5 (not near-transparent) so the dim state still clears 3:1 large-text contrast.
            gsap.fromTo(
              self.words,
              { opacity: 0.5 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 45%", scrub: true },
              },
            ),
        });
      }
    },
    { dependencies: [motion], revertOnUpdate: true, scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
