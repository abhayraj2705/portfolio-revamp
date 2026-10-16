import type Lenis from "lenis";

// Single Lenis instance shared across components (null when motion is off).
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export function scrollToTarget(target: string | number | HTMLElement) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -80, duration: 1.2, force: true });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (el instanceof HTMLElement) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80 });
}
