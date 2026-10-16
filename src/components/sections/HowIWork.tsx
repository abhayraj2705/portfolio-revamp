"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { disciplines, process } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";

export function HowIWork() {
  const [active, setActive] = useState<(typeof disciplines)[number]["id"]>(disciplines[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = disciplines.find((d) => d.id === active)!;
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Slide the accent underline to the active tab (and keep it there on resize).
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[disciplines.findIndex((d) => d.id === active)];
      const line = underlineRef.current;
      if (!tab || !line) return;
      line.style.width = `${tab.offsetWidth}px`;
      line.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (i + dir + disciplines.length) % disciplines.length;
    setActive(disciplines[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section border-t border-line" aria-labelledby="how-title">
      <div className="shell">
        <p className="kicker mb-6">Capabilities</p>
        <SplitReveal id="how-title" className="display mb-14 max-w-4xl text-[length:var(--fs-h1)]">
          How I work.
        </SplitReveal>

        <div role="tablist" aria-label="Disciplines" className="relative flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
          {disciplines.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${d.id}`}
              aria-selected={active === d.id}
              aria-controls={`panel-${d.id}`}
              tabIndex={active === d.id ? 0 : -1}
              onClick={() => setActive(d.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative pb-4 text-left text-[length:var(--fs-lg)] transition-colors",
                active === d.id ? "text-ink" : "text-muted hover:text-ink-2",
              )}
            >
              <span className="mr-2 font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
              {d.label}
            </button>
          ))}
          <span
            ref={underlineRef}
            aria-hidden
            className="absolute -bottom-px left-0 h-px bg-accent transition-[transform,width] duration-500 ease-[var(--ease-out-soft)]"
          />
        </div>

        <div className="min-h-[220px] py-10">
          <div
            key={current.id}
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="anim-fade-up grid gap-8 md:grid-cols-12"
          >
            <p className="display text-[length:var(--fs-h2)] italic leading-tight md:col-span-5">{current.line}</p>
            <ul className="grid grid-cols-2 gap-x-6 md:col-span-6 md:col-start-7">
              {current.skills.map((s) => (
                <li key={s} className="border-b border-line py-3 font-mono text-sm text-ink-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          {process.map((p) => (
            <div key={p.n}>
              <span className="display block text-6xl text-accent">{p.n}</span>
              <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-ink-2">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
