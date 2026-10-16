"use client";

import { Moon, Sun } from "lucide-react";
import { useSite } from "@/components/providers/SiteProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useSite();
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTheme(theme === "dark" ? "light" : "dark", { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label="Toggle colour theme"
      className={cn("grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:text-accent", className)}
    >
      {/* Icon is chosen by CSS so server and client markup always match */}
      <Sun className="size-4 light:hidden" aria-hidden />
      <Moon className="hidden size-4 light:block" aria-hidden />
    </button>
  );
}

export function MotionToggle({ className }: { className?: string }) {
  const { toggleMotion } = useSite();
  return (
    <button
      type="button"
      onClick={toggleMotion}
      className={cn("group font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink", className)}
    >
      Motion{" "}
      <span className="text-ink motion-off:hidden">on</span>
      <span className="hidden text-ink motion-off:inline">off</span>
    </button>
  );
}
