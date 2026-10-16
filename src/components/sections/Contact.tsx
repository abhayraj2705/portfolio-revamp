"use client";

import { profile } from "@/data/profile";
import { useLocalTime } from "@/lib/useLocalTime";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { toast } = useSite();
  const time = useLocalTime();
  const links: { label: string; href: string; download?: string }[] = [
    ...profile.socials,
    ...(profile.resume ? [{ label: "Résumé (PDF)", href: profile.resume, download: profile.resumeFileName }] : []),
  ];

  return (
    <section id="contact" className="section border-t border-line" aria-labelledby="contact-title">
      <div className="shell">
        <p className="kicker mb-8">04 / Contact</p>
        <SplitReveal id="contact-title" className="display max-w-6xl text-[length:var(--fs-mega)]">
          Something good starts with a <em className="text-accent">hello.</em>
        </SplitReveal>

        <Reveal className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 max-w-md text-[length:var(--fs-lg)] text-ink-2">
              Building something interesting? I reply within a day.
            </p>
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${profile.email}`}
                onClick={(e) => {
                  // Plain click copies; modifier-click opens the mail app.
                  if (e.metaKey || e.ctrlKey || e.shiftKey || !navigator.clipboard) return;
                  e.preventDefault();
                  navigator.clipboard.writeText(profile.email).then(
                    () => toast("Email copied ✓"),
                    () => (window.location.href = `mailto:${profile.email}`),
                  );
                }}
                className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-4 text-[clamp(1rem,2.4vw,1.5rem)] transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
              >
                {profile.email}
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted transition-colors group-hover:text-accent-ink">
                  Copy
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <ul className="flex flex-wrap gap-6">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" download={l.download} className="group inline-flex items-center gap-1 text-lg">
                    <span className="u-link">{l.label}</span>
                    <span className="arrow text-accent">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted" suppressHydrationWarning>
              {profile.city} {time || "--:--"} IST · {profile.coords}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
