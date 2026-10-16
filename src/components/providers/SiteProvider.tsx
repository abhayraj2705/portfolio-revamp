"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

type Theme = "dark" | "light";

type SiteState = {
  motion: boolean;
  toggleMotion: () => void;
  theme: Theme;
  setTheme: (t: Theme, origin?: { x: number; y: number }) => void;
  introDone: boolean;
  finishIntro: () => void;
  toast: (msg: string) => void;
};

const SiteContext = createContext<SiteState | null>(null);

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
};

const readDataset = (key: string) =>
  typeof document === "undefined" ? undefined : document.documentElement.dataset[key];

const store = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage blocked: preference just won't persist */
    }
  },
};

export function SiteProvider({ children }: { children: React.ReactNode }) {
  // The inline head script set data-theme / data-motion / data-intro before paint; read them once.
  // Markup must never branch on these values (CSS variants handle visuals), only effects may.
  const [motionOn, setMotionOn] = useState(() => readDataset("motion") !== "off");
  const [theme, setThemeState] = useState<Theme>(() => (readDataset("theme") === "light" ? "light" : "dark"));
  const [introDone, setIntroDone] = useState(() => readDataset("intro") === "skip");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  const toggleMotion = useCallback(() => {
    setMotionOn((on) => {
      const next = !on;
      document.documentElement.dataset.motion = next ? "on" : "off";
      store.set("motion", next ? "on" : "off");
      return next;
    });
  }, []);

  const setTheme = useCallback(
    (t: Theme, origin?: { x: number; y: number }) => {
      const root = document.documentElement;
      const apply = () => {
        root.dataset.theme = t;
        store.set("theme", t);
        setThemeState(t);
      };
      if (!motionOn || !document.startViewTransition || !origin) {
        apply();
        return;
      }
      root.dataset.vt = "theme";
      const vt = document.startViewTransition(apply);
      vt.ready.then(() => {
        const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
        root.animate(
          { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`] },
          { duration: 600, easing: "cubic-bezier(.77,0,.175,1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
      vt.finished.finally(() => delete root.dataset.vt);
    },
    [motionOn],
  );

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastOpen(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastOpen(false), 2000);
  }, []);

  return (
    <SiteContext.Provider value={{ motion: motionOn, toggleMotion, theme, setTheme, introDone, finishIntro, toast }}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center">
        <div
          className={`rounded-full bg-ink px-4 py-2 font-mono text-xs text-bg transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] ${
            toastOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          {toastMsg}
        </div>
      </div>
    </SiteContext.Provider>
  );
}
