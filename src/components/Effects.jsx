import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Custom cursor that follows the mouse with a glowing trail
 */
export function CursorGlow() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animate = () => {
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;
      trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] opacity-30"
        style={{
          willChange: "transform",
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

/**
 * Scroll progress bar at the very top of the page
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

/**
 * Premium designer-grade canvas background
 * Multi-layered grid with measurement marks, coordinate labels,
 * construction circles, dashed guidelines, and mouse-reactive glow
 */
export function DesignerGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let mouseX = -500, mouseY = -500;
    let animationId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const accent = isDark ? [52, 211, 153] : [5, 150, 105];
      const line = isDark ? [161, 161, 170] : [82, 82, 82];
      const fineAlpha = isDark ? 0.06 : 0.04;
      const majorAlpha = isDark ? 0.12 : 0.08;

      const FINE = 30;
      const MAJOR = 150;

      // ─── Layer 1: Fine grid ───
      ctx.strokeStyle = `rgba(${line[0]},${line[1]},${line[2]},${fineAlpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += FINE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += FINE) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // ─── Layer 2: Major grid ───
      ctx.strokeStyle = `rgba(${line[0]},${line[1]},${line[2]},${majorAlpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let x = 0; x <= w; x += MAJOR) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += MAJOR) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // ─── Layer 3: Diagonal construction lines ───
      ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${isDark ? 0.04 : 0.025})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([8, 12]);
      ctx.beginPath();
      for (let offset = -h; offset <= w + h; offset += MAJOR * 2) {
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + h, h);
      }
      for (let offset = -h; offset <= w + h; offset += MAJOR * 2) {
        ctx.moveTo(offset + h, 0);
        ctx.lineTo(offset, h);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // ─── Layer 4: Accent dots at major intersections ───
      for (let x = 0; x <= w; x += MAJOR) {
        for (let y = 0; y <= h; y += MAJOR) {
          const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
          const proximity = Math.max(0, 1 - dist / 250);
          const dotRadius = 1.5 + proximity * 3;
          const dotAlpha = (isDark ? 0.15 : 0.1) + proximity * 0.5;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${dotAlpha})`;
          ctx.fill();

          // Measurement tick marks at major intersections
          if (proximity > 0.1) {
            ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${proximity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x - 6, y);
            ctx.lineTo(x + 6, y);
            ctx.moveTo(x, y - 6);
            ctx.lineTo(x, y + 6);
            ctx.stroke();
          }
        }
      }

      // ─── Layer 5: Coordinate labels at major intersections near mouse ───
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.textBaseline = "top";
      for (let x = MAJOR; x <= w; x += MAJOR) {
        for (let y = MAJOR; y <= h; y += MAJOR) {
          const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
          if (dist < 200) {
            const alpha = Math.max(0, 1 - dist / 200) * (isDark ? 0.35 : 0.25);
            ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
            ctx.fillText(`${x},${y}`, x + 5, y + 4);
          }
        }
      }

      // ─── Layer 6: Mouse-reactive construction circle ───
      const pulse = Math.sin(time * 0.02) * 0.5 + 0.5;
      const circleRadius = 80 + pulse * 30;
      ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${isDark ? 0.08 + pulse * 0.04 : 0.05 + pulse * 0.03})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, circleRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner circle
      ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${isDark ? 0.06 : 0.04})`;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, circleRadius * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      // ─── Layer 7: Mouse radial glow ───
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
      gradient.addColorStop(0, `rgba(${accent[0]},${accent[1]},${accent[2]},${isDark ? 0.06 : 0.04})`);
      gradient.addColorStop(0.5, `rgba(${accent[0]},${accent[1]},${accent[2]},${isDark ? 0.02 : 0.01})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // ─── Layer 8: Corner decorations (design markers) ───
      const cornerSize = 20;
      const corners = [
        [0, 0], [w, 0], [0, h], [w, h]
      ];
      ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${isDark ? 0.15 : 0.1})`;
      ctx.lineWidth = 1;
      corners.forEach(([cx, cy]) => {
        const dx = cx === 0 ? 1 : -1;
        const dy = cy === 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(cx + dx * cornerSize, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + dy * cornerSize);
        ctx.stroke();
      });

      // ─── Layer 9: Floating measurement annotations ───
      const annotations = [
        { x: w * 0.15, y: h * 0.1, text: "grid: 30px" },
        { x: w * 0.85, y: h * 0.92, text: "scale: 1:1" },
        { x: w * 0.08, y: h * 0.88, text: "v2.0" },
      ];
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.textBaseline = "middle";
      annotations.forEach(({ x, y, text }) => {
        const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
        const alpha = dist < 300
          ? (isDark ? 0.25 : 0.18) + Math.max(0, 1 - dist / 300) * 0.2
          : (isDark ? 0.12 : 0.08);
        ctx.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`;
        ctx.fillText(text, x, y);
      });

      time++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
