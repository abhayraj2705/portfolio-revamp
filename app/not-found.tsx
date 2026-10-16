import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-svh flex-col justify-center pt-24">
      <p className="kicker mb-6">404</p>
      <h1 className="display text-[length:var(--fs-mega)]">
        This page <em className="text-accent">wandered off.</em>
      </h1>
      <Link href="/" className="group mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em]">
        <span className="arrow">←</span> <span className="u-link">Back home</span>
      </Link>
    </section>
  );
}
