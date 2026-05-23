import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Code-comment style hover annotation.
 * Looks like an IDE inline comment — left accent border,
 * // prefix, mono text, connecting arrow to the parent element.
 */
export function HoverReveal({ messages, children, className = "", position = "below" }) {
  const [hovered, setHovered] = useState(false);
  const idx = useRef(0);
  const [msg, setMsg] = useState(messages[0]);

  const handleEnter = () => {
    setMsg(messages[idx.current % messages.length]);
    idx.current++;
    setHovered(true);
  };

  const isAbove = position === "above";
  const posClass = isAbove ? "bottom-full mb-3" : "top-full mt-3";

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: isAbove ? -6 : 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isAbove ? -3 : 3, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute left-0 ${posClass} whitespace-nowrap z-50 pointer-events-none`}
          >
            {/* Connecting line from element to tooltip */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute left-4 w-[1px] bg-accent/25 ${
                isAbove ? "bottom-0 h-3 origin-bottom translate-y-full" : "top-0 h-3 origin-top -translate-y-full"
              }`}
            />

            {/* Comment box */}
            <div
              className="relative rounded-md overflow-hidden"
              style={{
                background: "var(--background)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(52,211,153,0.08)",
              }}
            >
              {/* Accent left border */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/60 origin-top"
              />

              <div className="flex items-center gap-0 pl-3.5 pr-4 py-2">
                {/* // prefix */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.08 }}
                  className="font-mono text-[10px] text-accent/30 mr-1.5 select-none flex-shrink-0"
                >
                  //
                </motion.span>

                {/* Message with character stagger */}
                <span className="font-mono text-[10px] text-accent/70 tracking-wide flex">
                  {msg.split("").map((char, i) => (
                    <motion.span
                      key={`${msg}-${i}`}
                      initial={{ opacity: 0, filter: "blur(3px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        delay: 0.1 + i * 0.018,
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
        )}
      </AnimatePresence>
    </span>
  );
}
