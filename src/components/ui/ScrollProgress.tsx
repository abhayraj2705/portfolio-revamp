/** 1px progress bar driven by a CSS scroll timeline: zero JS (see .scroll-progress in globals.css). */
export function ScrollProgress() {
  return <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[80] h-px bg-accent" />;
}
