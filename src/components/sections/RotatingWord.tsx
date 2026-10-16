"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSite } from "@/components/providers/SiteProvider";

/** Hero word cycler (MOTION.md §4). Static first word when motion is off. */
export function RotatingWord({ words, start }: { words: readonly string[]; start: boolean }) {
  const { motion } = useSite();
  const [i, setI] = useState(0);
  const boxRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const prevWidth = useRef<number | null>(null);

  // Cycle: slide the current word out, then swap the text (the layout effect slides it in).
  useEffect(() => {
    const word = wordRef.current;
    const box = boxRef.current;
    if (!motion || !start || !word || !box) {
      setI(0);
      return;
    }
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(box);

    let timer: number;
    let current = 0;
    const schedule = () => {
      const wait = current === words.length - 1 ? 4000 : 2400;
      timer = window.setTimeout(() => {
        if (!visible || document.hidden) return schedule();
        prevWidth.current = box.offsetWidth;
        // ±130% (not 100%) so descenders like the "p" in "payment" fully clear the mask.
        gsap.to(word, {
          yPercent: -130,
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => {
            current = (current + 1) % words.length;
            setI(current);
            schedule();
          },
        });
      }, wait);
    };
    schedule();
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
      gsap.killTweensOf(word);
      gsap.set(word, { clearProps: "all" });
      box.style.width = "";
    };
  }, [motion, start, words.length]);

  // Slide the new word in and ease the box to its width.
  useLayoutEffect(() => {
    const box = boxRef.current;
    const word = wordRef.current;
    if (!box || !word || prevWidth.current === null) return;
    const to = word.offsetWidth;
    gsap.fromTo(box, { width: prevWidth.current }, { width: to, duration: 0.6, ease: "power4.out", clearProps: "width" });
    gsap.fromTo(word, { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
    prevWidth.current = null;
  }, [i]);

  return (
    <span ref={boxRef} className="relative inline-flex overflow-clip pb-[0.08em] align-bottom" aria-hidden>
      <span ref={wordRef} className="inline-block whitespace-nowrap italic text-accent">
        {words[i]}
      </span>
    </span>
  );
}
