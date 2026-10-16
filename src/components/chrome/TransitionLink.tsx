"use client";

import { useEffect, type ComponentProps } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getLenis } from "@/lib/lenis";
import { isMotionOn } from "@/lib/utils";

// Resolves the open view transition once the new route has committed.
let finishPending: (() => void) | null = null;

/** Mounted once in the layout: closes view transitions and resets scroll on route change. */
export function RouteWatcher() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) getLenis()?.scrollTo(0, { immediate: true, force: true });
    finishPending?.();
    finishPending = null;
  }, [pathname]);
  return null;
}

/**
 * next/link that wraps client navigation in a View Transition, so elements sharing a
 * `view-transition-name` (work thumbnail → case-study hero) morph between pages (MOTION.md §7).
 */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (!document.startViewTransition || !isMotionOn()) return; // plain Link navigation
        e.preventDefault();
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              finishPending = resolve;
              router.push(href);
              window.setTimeout(resolve, 1500); // never hang the page on a slow route
            }),
        );
      }}
    />
  );
}
