// Motion tokens: docs/MOTION.md §1
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  outSoft: [0.22, 1, 0.36, 1] as const,
  inOut: [0.77, 0, 0.175, 1] as const,
};
export const gsapEase = { out: "expo.out", outSoft: "power4.out", inOut: "power4.inOut" };
export const dur = { xs: 0.15, sm: 0.3, md: 0.6, lg: 0.9, xl: 1.2 };
export const stagger = { chars: 0.02, words: 0.04, lines: 0.08, items: 0.06 };
