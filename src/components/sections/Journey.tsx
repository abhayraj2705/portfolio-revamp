"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { certifications, timeline } from "@/data/experience";
import { useSite } from "@/components/providers/SiteProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";

export function Journey() {
  const { motion } = useSite();
  const ref = useRef<HTMLDivElement>(null);

  // Progress line fills as you scroll; years light up as they cross the middle (MOTION.md §5).
  useGSAP(
    () => {
      if (!motion || !ref.current) return;
      const q = gsap.utils.selector(ref);
      gsap.fromTo(
        q("[data-fill]"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 60%", end: "bottom 60%", scrub: 0.5 } },
      );
      q("[data-year]").forEach((el: Element) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          toggleClass: { targets: el, className: "is-active" },
        });
      });
    },
    { dependencies: [motion], revertOnUpdate: true, scope: ref },
  );

  return (
    <section id="journey" className="section border-t border-line" aria-labelledby="journey-title">
      <div className="shell">
        <p className="kicker mb-6">03 / Journey</p>
        <SplitReveal id="journey-title" className="display mb-16 text-[length:var(--fs-h1)]">
          Still becoming.
        </SplitReveal>

        <div ref={ref} className="relative">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line md:left-[calc(25%-1px)]">
            <span data-fill className="absolute inset-0 origin-top bg-accent motion-off:hidden" />
          </span>

          <ol className="space-y-16 md:space-y-24">
            {timeline.map((entry) => (
              <li key={entry.year} className="grid gap-6 pl-6 md:grid-cols-4 md:gap-8 md:pl-0">
                <p
                  data-year
                  className="display text-5xl text-muted transition-colors duration-500 [&.is-active]:text-accent motion-off:text-ink md:pr-10 md:text-right md:text-7xl"
                >
                  {entry.year}
                </p>
                <Reveal className="space-y-10 md:col-span-3 md:pl-10" y={24}>
                  {entry.items.map((item) => (
                    <article key={item.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="text-[length:var(--fs-lg)] font-medium">{item.title}</h3>
                        {item.when && <span className="font-mono text-xs text-muted">{item.when}</span>}
                      </div>
                      {item.org && <p className="mt-1 font-mono text-xs uppercase tracking-[0.06em] text-ink-2">{item.org}</p>}
                      {item.note && <p className="mt-3 max-w-2xl text-ink-2">{item.note}</p>}
                      {item.bullets && (
                        <ul className="mt-4 max-w-2xl space-y-2 text-ink-2">
                          {item.bullets.map((b) => (
                            <li key={b} className="flex gap-3">
                              <span className="mt-[0.55em] block size-1 flex-none rounded-full bg-accent" aria-hidden />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-4 md:gap-8">
          <h3 className="kicker md:pr-10 md:text-right">Certifications</h3>
          <Reveal as="ul" className="border-t border-line md:col-span-3 md:ml-10" y={16}>
            {certifications.map((c) => {
              const body = (
                <>
                  <span className="text-base">{c.title}</span>
                  <span className="font-mono text-xs text-muted">
                    {c.issuer} · {c.date}
                    {c.href && <span className="arrow ml-1">↗</span>}
                  </span>
                </>
              );
              return (
                <li key={c.title} className="border-b border-line">
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="group flex flex-wrap justify-between gap-2 py-4">
                      {body}
                    </a>
                  ) : (
                    <div className="flex flex-wrap justify-between gap-2 py-4">{body}</div>
                  )}
                </li>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
