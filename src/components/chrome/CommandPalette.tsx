"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { featured } from "@/data/projects";
import { useSite } from "@/components/providers/SiteProvider";
import { navItems } from "./nav-items";

type Action = { id: string; group: string; label: string; hint?: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, toggleMotion, toast } = useSite();

  const close = useCallback(() => setOpen(false), []);

  const actions = useMemo<Action[]>(() => {
    const goSection = (id: string) => {
      if (pathname === "/") scrollToTarget(`#${id}`);
      else router.push(`/#${id}`);
    };
    return [
      ...navItems.map((n) => ({ id: n.id, group: "Go to", label: n.label, hint: n.n, run: () => goSection(n.id) })),
      ...featured.map((p) => ({
        id: `work-${p.slug}`,
        group: "Work",
        label: `${p.title}: ${p.kind}`,
        hint: p.year,
        run: () => router.push(`/work/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => navigator.clipboard?.writeText(profile.email).then(() => toast("Email copied ✓")),
      },
      {
        id: "theme",
        group: "Actions",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        run: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      { id: "motion", group: "Actions", label: "Toggle motion", run: toggleMotion },
      ...profile.socials.map((s) => ({
        id: s.label,
        group: "Elsewhere",
        label: s.label,
        hint: "↗",
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ];
  }, [pathname, router, theme, setTheme, toggleMotion, toast]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => `${a.group} ${a.label}`.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      lenis?.stop();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset on open
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      lenis?.start();
      returnFocus.current?.focus?.();
    }
  }, [open]);

  const runAt = (i: number) => {
    const action = results[i];
    if (!action) return;
    close();
    action.run();
  };

  let lastGroup = "";

  return (
    open && (
        <div className="anim-fade-in fixed inset-0 z-[85] flex items-start justify-center px-4 pt-[14vh]">
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={close} aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="anim-pop-in relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(i + 1, results.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(i - 1, 0));
              }
              if (e.key === "Enter") runAt(index);
              if (e.key === "Tab") e.preventDefault(); // keep focus in the input
            }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-xs text-accent">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="Jump to, copy, toggle…"
                aria-label="Search commands"
                aria-controls="palette-results"
                aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
              />
              <kbd className="font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">Nothing matches “{query}”.</li>}
              {results.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                return (
                  <li key={a.id}>
                    {header && <p className="kicker px-3 pb-1 pt-3 text-[10px]">{header}</p>}
                    <div
                      id={`cmd-${a.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runAt(i)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm",
                        i === index ? "bg-surface-2 text-ink" : "text-ink-2",
                      )}
                    >
                      <span>{a.label}</span>
                      {a.hint && <span className="font-mono text-[11px] text-muted">{a.hint}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
    )
  );
}
