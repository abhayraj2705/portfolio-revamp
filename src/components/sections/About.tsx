import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { PixelPortrait } from "./PixelPortrait";

export function About() {
  const { about } = profile;
  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-title">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="kicker mb-6">01 / About</p>
          <div className="max-w-xs md:sticky md:top-28 md:max-w-none">
            <PixelPortrait alt="Portrait of Abhayraj B in a dark blazer and white shirt" />
          </div>
        </div>

        <div className="md:col-span-8">
          <SplitReveal id="about-title" className="display mb-10 text-[length:var(--fs-h1)]">
            {about.title}
          </SplitReveal>
          <SplitReveal as="p" mode="words" className="max-w-3xl text-[length:var(--fs-h2)] leading-[1.2] tracking-[-0.01em]">
            {about.statement}
          </SplitReveal>

          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="kicker mb-4">Three things I believe</h3>
              <Reveal as="ol" className="border-t border-line">
                {about.beliefs.map((b, i) => (
                  <li key={b} className="flex gap-4 border-b border-line py-4">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[length:var(--fs-lg)] leading-snug">{b}</span>
                  </li>
                ))}
              </Reveal>
            </div>
            <div>
              <h3 className="kicker mb-4">What I&apos;m looking for</h3>
              <Reveal as="ul" className="border-t border-line">
                {about.lookingFor.map((b) => (
                  <li key={b} className="flex gap-4 border-b border-line py-4 text-ink-2">
                    <span className="text-accent" aria-hidden>
                      ✦
                    </span>
                    {b}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
