"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { useLocalTime } from "@/lib/useLocalTime";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { useSite } from "@/components/providers/SiteProvider";
import { MotionToggle, ThemeToggle } from "./Toggles";
import { navItems } from "./nav-items";
import { TransitionLink } from "./TransitionLink";

export const openPalette = () => window.dispatchEvent(new Event("palette:open"));

export function useSectionLink() {
  const pathname = usePathname();
  return (id: string) => ({
    href: `/#${id}`,
    onClick: (e: React.MouseEvent) => {
      if (pathname !== "/") return;
      e.preventDefault();
      scrollToTarget(`#${id}`);
      history.replaceState(null, "", `#${id}`);
    },
  });
}

export function Nav() {
  const { motion: motionOn, introDone } = useSite();
  const time = useLocalTime();
  const sectionLink = useSectionLink();
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const introAtMount = useRef(introDone);

  // Fade the nav in as the loader wipes away (first visit only).
  useGSAP(
    () => {
      if (!motionOn || introAtMount.current || !introDone) return;
      gsap.from(ref.current, { y: -12, autoAlpha: 0, duration: 0.6, delay: 0.15, ease: "expo.out" });
    },
    { dependencies: [introDone] },
  );

  // Highlight the section in view.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null); // eslint-disable-line react-hooks/set-state-in-effect -- clear highlight off the home page
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  // Freeze page scroll while the menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header ref={ref} className="fixed inset-x-0 top-0 z-[70]">
        {/* Soft fade so text scrolling underneath never collides with the logo and controls */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-bg via-bg/80 to-transparent" />
        {/* Equal outer columns keep the pill truly centred regardless of side widths */}
        <div className="shell flex h-16 items-center justify-between gap-4 md:grid md:h-20 md:grid-cols-[1fr_auto_1fr]">
          <TransitionLink href="/" aria-label={`${profile.name}, home`} className="group flex items-center gap-2 justify-self-start font-mono text-sm">
            <span className="grid size-9 place-items-center rounded-full border border-line font-deva text-base transition-colors group-hover:border-accent group-hover:text-accent">
              अ
            </span>
            <span className="hidden text-ink-2 sm:inline">AB</span>
          </TransitionLink>

          <nav aria-label="Primary" className="glass hidden rounded-full px-2 py-1.5 md:block">
            <ul className="flex items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    {...sectionLink(item.id)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm"
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] transition-colors",
                        active === item.id ? "text-accent" : "text-muted",
                      )}
                    >
                      {item.n}
                    </span>
                    <span className="roll">
                      <span>{item.label}</span>
                      <span aria-hidden>{item.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 justify-self-end md:gap-3">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-muted lg:inline" suppressHydrationWarning>
              Pune <span className="text-ink">{time || "--:--"}</span> IST
            </span>
            <MotionToggle className="hidden lg:inline" />
            <ThemeToggle />
            <button
              type="button"
              onClick={openPalette}
              className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-ink md:inline"
              aria-label="Open command palette"
            >
              ⌘K
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-wider md:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Always mounted so it can animate out; inert + hidden from AT while closed */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-[65] flex flex-col justify-between bg-surface pb-8 pt-28 transition-[clip-path,visibility] md:hidden",
          menuOpen
            ? "visible duration-800 ease-[var(--ease-in-out)] [clip-path:circle(150%_at_100%_0%)]"
            : "invisible duration-600 ease-[var(--ease-in-out)] [clip-path:circle(0%_at_100%_0%)]",
        )}
      >
        <ul className="shell space-y-1">
          {navItems.map((item, i) => (
            <li key={item.id} className="mask pb-1">
              <a
                {...sectionLink(item.id)}
                onClickCapture={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${250 + i * 70}ms` : "0ms" }}
                className={cn(
                  "flex items-baseline gap-4 transition-transform duration-800 ease-[var(--ease-out)]",
                  menuOpen ? "translate-y-0" : "translate-y-[110%]",
                )}
              >
                <span className="font-mono text-xs text-accent">{item.n}</span>
                <span className="display text-[clamp(3rem,15vw,5rem)]">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="shell flex items-center justify-between font-mono text-xs text-muted">
          <span suppressHydrationWarning>Pune {time} IST</span>
          <MotionToggle />
        </div>
      </div>
    </>
  );
}
