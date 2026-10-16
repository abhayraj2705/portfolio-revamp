"use client";

import dynamic from "next/dynamic";

// Not needed for first paint: load after hydration to keep the main bundle lean.
const CommandPalette = dynamic(() => import("./CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const Cursor = dynamic(() => import("@/components/ui/Cursor").then((m) => m.Cursor), { ssr: false });

export function LazyChrome() {
  return (
    <>
      <CommandPalette />
      <Cursor />
    </>
  );
}
