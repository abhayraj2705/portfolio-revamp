"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";

const REST = 48;
const FULL = 960;
// Resolve: dips to 24 for a glitch beat, then sharpens (MOTION.md §6).
const RESOLVE = [32, 24, 64, 128, 256, 512, FULL];
const PIXELATE = [256, 64, REST];
const STEP_MS = 110;

/**
 * Pixel-art portrait that resolves to the photo on hover (or once on scroll-in for touch).
 * The static 48px PNG paints first, so there's no layout shift and no blank canvas before JS.
 */
export function PixelPortrait({ alt }: { alt: string }) {
  const { motion } = useSite();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const currentRef = useRef(REST);
  const timerRef = useRef<number | undefined>(undefined);
  const [res, setRes] = useState(REST);
  const [ready, setReady] = useState(false);

  const draw = (n: number) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    if (n >= FULL) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, size, size);
    } else {
      const off = document.createElement("canvas");
      off.width = off.height = n;
      off.getContext("2d")?.drawImage(img, 0, 0, n, n);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, n, n, 0, 0, size, size);
    }
    currentRef.current = n;
    setRes(n);
  };

  const run = (steps: number[]) => {
    window.clearTimeout(timerRef.current);
    const next = (i: number) => {
      if (i >= steps.length) return;
      draw(steps[i]);
      timerRef.current = window.setTimeout(() => next(i + 1), STEP_MS);
    };
    next(0);
  };

  useEffect(() => {
    if (!motion) return;
    const img = new Image();
    img.src = "/me/portrait.webp";
    img.decoding = "async";
    img.onload = () => {
      imgRef.current = img;
      draw(REST);
      setReady(true);
    };
    return () => window.clearTimeout(timerRef.current);
  }, [motion]);

  // Touch devices have no hover: resolve once when the portrait scrolls into view.
  useEffect(() => {
    if (!ready || window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run(RESOLVE);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const showCanvas = motion && ready;

  return (
    <figure>
      <div
        ref={wrapRef}
        className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-surface"
        onPointerEnter={(e) => e.pointerType === "mouse" && showCanvas && run(RESOLVE)}
        onPointerLeave={(e) => e.pointerType === "mouse" && showCanvas && run(PIXELATE)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel art must not be resampled by next/image */}
        <img
          src="/me/portrait-pixel-48.png"
          alt={alt}
          width={960}
          height={960}
          className="pixelated absolute inset-0 size-full object-cover"
        />
        <canvas
          ref={canvasRef}
          width={FULL}
          height={FULL}
          aria-hidden
          className="absolute inset-0 size-full transition-opacity duration-300"
          style={{ opacity: showCanvas ? 1 : 0 }}
        />
      </div>
      <figcaption className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        <span>fig. 01 — abhayraj</span>
        <span className="tabular-nums">{res >= FULL ? "960px" : `${res}px`}</span>
      </figcaption>
    </figure>
  );
}
