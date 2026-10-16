import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featured, getProject } from "@/data/projects";
import { TransitionLink } from "@/components/chrome/TransitionLink";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { WorkMedia } from "@/components/sections/WorkMedia";
import { Footer } from "@/components/sections/Footer";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title}: ${p.kind}`,
    description: p.oneLiner,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title}: ${p.kind}`, description: p.oneLiner, url: `/work/${p.slug}` },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.caseStudy) notFound();
  const cs = p.caseStudy;
  const i = featured.findIndex((f) => f.slug === p.slug);
  const next = featured[(i + 1) % featured.length];

  return (
    <article>
      <header className="shell pb-12 pt-32 md:pt-40">
        <TransitionLink href="/#work" className="group mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted hover:text-ink">
          <span className="arrow">←</span> All work
        </TransitionLink>
        <p className="kicker mb-6">
          {String(i + 1).padStart(2, "0")} / {p.kind}
          {p.tag ? ` · ${p.tag}` : ""}
        </p>
        <SplitReveal as="h1" className="display text-[length:var(--fs-mega)]">
          {p.title}
        </SplitReveal>
        <p className="mt-6 max-w-3xl text-[length:var(--fs-h2)] leading-tight text-ink-2">{p.oneLiner}</p>

        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
          <div>
            <dt className="kicker mb-2">Role</dt>
            <dd>{cs.role}</dd>
          </div>
          <div>
            <dt className="kicker mb-2">Year</dt>
            <dd>{p.year}</dd>
          </div>
          <div>
            <dt className="kicker mb-2">Stack</dt>
            <dd className="font-mono text-sm text-ink-2">{p.stack.join(" / ")}</dd>
          </div>
          <div>
            <dt className="kicker mb-2">Live</dt>
            <dd>
              <a href={p.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1">
                <span className="u-link">{p.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</span>
                <span className="arrow text-accent">↗</span>
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <div className="shell">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-[3px] bg-surface"
          style={{ viewTransitionName: `work-${p.slug}` }}
        >
          <WorkMedia project={p} sizes="(min-width: 1440px) 1312px, 100vw" priority />
        </div>
      </div>

      <div className="shell section grid gap-16 md:grid-cols-12">
        <section className="md:col-span-4">
          <h2 className="kicker mb-4">The problem</h2>
          <p className="text-[length:var(--fs-lg)] leading-relaxed">{cs.problem}</p>
        </section>
        <section className="md:col-span-7 md:col-start-6">
          <h2 className="kicker mb-4">What I built</h2>
          <Reveal as="ol" className="border-t border-line" y={20}>
            {cs.built.map((b, n) => (
              <li key={b} className="flex gap-5 border-b border-line py-5">
                <span className="font-mono text-xs text-accent">{String(n + 1).padStart(2, "0")}</span>
                <span className="text-ink-2">{b}</span>
              </li>
            ))}
          </Reveal>
        </section>
      </div>

      <section className="border-y border-line bg-surface">
        <div className="shell section grid gap-10 md:grid-cols-12">
          <h2 className="kicker md:col-span-3">The hard part</h2>
          <div className="md:col-span-8 md:col-start-5">
            <SplitReveal as="h3" className="display mb-6 text-[length:var(--fs-h1)]">
              {cs.hardPart.title}
            </SplitReveal>
            <p className="max-w-3xl text-[length:var(--fs-lg)] leading-relaxed text-ink-2">{cs.hardPart.body}</p>
          </div>
        </div>
      </section>

      <section className="shell section">
        <h2 className="kicker mb-8">Outcome</h2>
        <Reveal as="ul" className="grid gap-6 md:grid-cols-3">
          {cs.outcome.map((o) => (
            <li key={o} className="border-t border-accent pt-5 text-[length:var(--fs-lg)] leading-snug">
              {o}
            </li>
          ))}
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-2">
          {p.highlights.map((h) => (
            <span key={h} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-2">
              {h}
            </span>
          ))}
        </div>
      </section>

      <nav aria-label="Next project" className="border-t border-line">
        <TransitionLink href={`/work/${next.slug}`} data-cursor="view" className="shell group block py-20 md:py-28">
          <span className="kicker">Next project ↘</span>
          <span className="display mt-4 block text-[length:var(--fs-mega)] transition-colors duration-500 group-hover:text-accent">
            {next.title}
          </span>
          <span className="mt-2 block text-ink-2">{next.kind}</span>
        </TransitionLink>
      </nav>
      <Footer />
    </article>
  );
}
