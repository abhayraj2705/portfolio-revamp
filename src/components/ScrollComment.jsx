import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Scroll-triggered code-comment annotation.
 * Appears automatically when scrolled into view — like a guided tour.
 * Same visual style as HoverReveal (IDE annotation),
 * but triggered by scroll instead of hover.
 */
export function ScrollComment({ text, delay = 0, align = "left" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`my-5 flex ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      <motion.div
        initial={{ opacity: 0, x: align === "right" ? 8 : -8, scale: 0.97 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: align === "right" ? 8 : -8, scale: 0.97 }
        }
        transition={{
          duration: 0.45,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="relative rounded-md overflow-hidden inline-block"
          style={{
            background: "var(--background)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(52,211,153,0.08)",
          }}
        >
          {/* Accent left border */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/60 origin-top"
          />

          <div className="flex items-center pl-3.5 pr-4 py-2">
            {/* // prefix */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2, delay: delay + 0.12 }}
              className="font-mono text-[10px] text-accent/30 mr-1.5 select-none flex-shrink-0"
            >
              //
            </motion.span>

            {/* Character-by-character reveal */}
            <span className="font-mono text-[10px] text-accent/70 tracking-wide flex">
              {isInView &&
                text.split("").map((char, i) => (
                  <motion.span
                    key={`${text}-${i}`}
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      delay: delay + 0.15 + i * 0.018,
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
