"use client";

import { profile } from "@/data/profile";
import { scrollToTarget } from "@/lib/lenis";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-10">
      <div className="shell flex flex-col gap-4 pb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {profile.name}</p>
        <p>Built with intent in {profile.city}</p>
        <button type="button" onClick={() => scrollToTarget(0)} className="group inline-flex items-center gap-1 text-left uppercase hover:text-ink">
          Back to top <span className="arrow">↑</span>
        </button>
      </div>
      {/* Decorative: drawn via ::before so it isn't treated as (low-contrast) page text */}
      <div
        aria-hidden
        data-text={profile.nameDeva}
        className="pointer-events-none -mb-[0.32em] select-none text-center font-deva text-[clamp(6rem,26vw,24rem)] leading-none text-ink opacity-[0.06] before:content-[attr(data-text)]"
      />
    </footer>
  );
}
