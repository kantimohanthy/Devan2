"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ox: number; // displacement offset from field distortion
  oy: number;
}

const MAX_PARTICLES = 70;
const LINK_DIST = 130;
const CURSOR_RADIUS = 170;

/**
 * CursorField renders a single fixed canvas behind all page content.
 * It draws a sparse field of drifting nodes with faint constellation
 * links, gently distorted by cursor proximity — the "signal" motif
 * that ties the whole site's ambient layer together.
 *
 * Perf notes: capped particle count, single rAF loop, pauses on tab
 * blur, skips entirely under prefers-reduced-motion.
 */
export function CursorField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const target = { px: 0, py: 0 }; // eased parallax offset
    let pulseStrength = 0;
    let pulseOrigin = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(MAX_PARTICLES, Math.round((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.6,
        ox: 0,
        oy: 0,
      }));
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      document.documentElement.style.setProperty("--cursor-x", `${(e.clientX / width) * 100}%`);
      document.documentElement.style.setProperty("--cursor-y", `${(e.clientY / height) * 100}%`);
    }
    function onMouseLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      visible = document.visibilityState === "visible";
    }
    function onPulse() {
      pulseStrength = 1;
      pulseOrigin = mouse.active ? { x: mouse.x, y: mouse.y } : { x: width / 2, y: height / 2.6 };
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx!.clearRect(0, 0, width, height);

      // ease the whole-field parallax toward the mouse
      const nx = mouse.active ? mouse.x / width - 0.5 : 0;
      const ny = mouse.active ? mouse.y / height - 0.5 : 0;
      target.px += (nx * 14 - target.px) * 0.04;
      target.py += (ny * 14 - target.py) * 0.04;
      wrap!.style.transform = `translate3d(${target.px}px, ${target.py}px, 0)`;

      pulseStrength *= 0.965;
      if (pulseStrength < 0.01) pulseStrength = 0;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // field distortion: push particles gently away from the cursor
        let dx = 0;
        let dy = 0;
        if (mouse.active) {
          const ddx = p.x - mouse.x;
          const ddy = p.y - mouse.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < CURSOR_RADIUS) {
            const force = (1 - dist / CURSOR_RADIUS) * 18;
            dx = (ddx / (dist || 1)) * force;
            dy = (ddy / (dist || 1)) * force;
          }
        }
        if (pulseStrength > 0) {
          const pdx = p.x - pulseOrigin.x;
          const pdy = p.y - pulseOrigin.y;
          const pdist = Math.hypot(pdx, pdy);
          const pforce = pulseStrength * 46 * Math.exp(-pdist / 340);
          dx += (pdx / (pdist || 1)) * pforce;
          dy += (pdy / (pdist || 1)) * pforce;
        }
        p.ox += (dx - p.ox) * 0.08;
        p.oy += (dy - p.oy) * 0.08;
      }

      // constellation links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x + b.ox;
          const by = b.y + b.oy;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < LINK_DIST) {
            const linkAlpha = 0.08 * (1 - d / LINK_DIST) * (1 + pulseStrength * 2);
            ctx!.strokeStyle = `rgba(79, 140, 255, ${linkAlpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(ax, ay);
            ctx!.lineTo(bx, by);
            ctx!.stroke();
          }
        }
        ctx!.fillStyle = `rgba(245, 245, 245, ${0.45 + pulseStrength * 0.35})`;
        ctx!.beginPath();
        ctx!.arc(ax, ay, a.r * (1 + pulseStrength * 0.8), 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("field:pulse", onPulse);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("field:pulse", onPulse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="glow-layer absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--cursor-x, 50%) var(--cursor-y, 30%), rgba(79,140,255,0.08), transparent 65%)",
        }}
      />
      {!reducedMotion && (
        <div ref={wrapRef} className="absolute inset-0 will-change-transform">
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}
