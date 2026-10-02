"use client";

import { useEffect, useRef } from "react";

/**
 * A living wireless mesh over mountain terrain.
 * Towers sit on the ridgelines, links form between nodes in radio range,
 * packets route hop by hop (BFS shortest path), and sub GHz wavefronts
 * ripple out from relays. The cursor joins the mesh as a gateway node.
 *
 * Pauses when off screen or when the tab is hidden; draws a single still
 * frame when the visitor prefers reduced motion.
 */

type Node = { x: number; y: number; vx: number; vy: number; tower: boolean; pulse: number; phase: number };
type Packet = { path: number[]; seg: number; t: number; speed: number; hue: "cyan" | "amber"; trail: { x: number; y: number }[] };
type Ring = { x: number; y: number; r: number; life: number };

const CYAN = "103, 232, 249";
const BLUE = "79, 140, 255";
const AMBER = "247, 185, 85";

function ridge(x: number, w: number, seed: number, base: number, amp: number) {
  const u = x / w;
  return (
    base -
    amp *
      (0.55 * Math.sin(u * 6.2 + seed) +
        0.3 * Math.sin(u * 13.7 + seed * 2.1) +
        0.15 * Math.sin(u * 29.3 + seed * 3.7))
  );
}

export function MeshField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let rings: Ring[] = [];
    let range = 160;
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let spawnClock = 0;
    let ringClock = 0;

    const ridges = [
      { seed: 1.3, base: 0.8, amp: 0.09, alpha: 0.05 },
      { seed: 4.1, base: 0.87, amp: 0.07, alpha: 0.08 },
      { seed: 7.7, base: 0.94, amp: 0.05, alpha: 0.12 },
    ];

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = w * h;
      const count = Math.max(26, Math.min(90, Math.round(area / 16000)));
      range = Math.max(120, Math.min(190, Math.sqrt(area / count) * 1.55));
      nodes = [];
      // towers on the ridgelines
      const towers = Math.round(count * 0.35);
      for (let i = 0; i < towers; i++) {
        const r = ridges[i % ridges.length];
        const x = (w * (i + 0.5)) / towers + (Math.random() - 0.5) * 40;
        const y = ridge(x, w, r.seed, h * r.base, h * r.amp) - 2;
        nodes.push({ x, y, vx: 0, vy: 0, tower: true, pulse: 0, phase: Math.random() * 6.28 });
      }
      // airborne / rooftop relays drifting slowly
      for (let i = towers; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: h * (0.08 + Math.random() * 0.62),
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          tower: false,
          pulse: 0,
          phase: Math.random() * 6.28,
        });
      }
      packets = [];
      rings = [];
    }

    function neighbours(i: number): number[] {
      const out: number[] = [];
      const a = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (dx * dx + dy * dy < range * range) out.push(j);
      }
      return out;
    }

    function route(src: number, dst: number): number[] | null {
      const prev = new Int32Array(nodes.length).fill(-1);
      const seen = new Uint8Array(nodes.length);
      const q = [src];
      seen[src] = 1;
      while (q.length) {
        const cur = q.shift()!;
        if (cur === dst) break;
        for (const n of neighbours(cur)) {
          if (!seen[n]) {
            seen[n] = 1;
            prev[n] = cur;
            q.push(n);
          }
        }
      }
      if (!seen[dst]) return null;
      const path: number[] = [];
      for (let c = dst; c !== -1; c = prev[c]) path.unshift(c);
      return path.length > 2 ? path : null;
    }

    function spawn() {
      for (let tries = 0; tries < 6; tries++) {
        const src = Math.floor(Math.random() * nodes.length);
        // prefer long routes: pick a destination on the far side
        const far = nodes
          .map((n, i) => ({ i, d: Math.abs(n.x - nodes[src].x) }))
          .sort((a, b) => b.d - a.d)
          .slice(0, 8);
        const dst = far[Math.floor(Math.random() * far.length)].i;
        const path = route(src, dst);
        if (path) {
          packets.push({
            path,
            seg: 0,
            t: 0,
            speed: 0.9 + Math.random() * 0.8,
            hue: Math.random() < 0.18 ? "amber" : "cyan",
            trail: [],
          });
          return;
        }
      }
    }

    function drawTerrain() {
      for (const r of ridges) {
        ctx!.beginPath();
        ctx!.moveTo(0, h);
        for (let x = 0; x <= w; x += 6) ctx!.lineTo(x, ridge(x, w, r.seed, h * r.base, h * r.amp));
        ctx!.lineTo(w, h);
        ctx!.closePath();
        const g = ctx!.createLinearGradient(0, h * (r.base - r.amp), 0, h);
        g.addColorStop(0, `rgba(${BLUE}, ${r.alpha})`);
        g.addColorStop(1, `rgba(${BLUE}, 0)`);
        ctx!.fillStyle = g;
        ctx!.fill();
        ctx!.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y = ridge(x, w, r.seed, h * r.base, h * r.amp);
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(${CYAN}, ${r.alpha * 1.6})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    function frame(now: number) {
      const dt = Math.min(48, now - last) / 16.67;
      last = now;
      ctx!.clearRect(0, 0, w, h);
      drawTerrain();

      // drift relays
      for (const n of nodes) {
        if (n.tower) continue;
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < h * 0.05 || n.y > h * 0.72) n.vy *= -1;
      }

      // links
      const R2 = range * range;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const s = 1 - d2 / R2;
            ctx!.strokeStyle = `rgba(${BLUE}, ${0.04 + s * 0.16})`;
            ctx!.lineWidth = 0.6 + s * 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        // gateway (cursor) links
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const gr = range * 1.25;
          if (d2 < gr * gr) {
            const s = 1 - Math.sqrt(d2) / gr;
            ctx!.strokeStyle = `rgba(${CYAN}, ${0.15 + s * 0.55})`;
            ctx!.lineWidth = 0.8 + s;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
            a.pulse = Math.max(a.pulse, s * 0.6);
          }
        }
      }

      // wavefronts
      ringClock += dt;
      if (ringClock > 70 && nodes.length) {
        ringClock = 0;
        const t = nodes.filter((n) => n.tower);
        const n = t[Math.floor(Math.random() * t.length)] || nodes[0];
        rings.push({ x: n.x, y: n.y, r: 4, life: 1 });
      }
      rings = rings.filter((r) => r.life > 0);
      for (const r of rings) {
        r.r += 1.6 * dt;
        r.life -= 0.006 * dt;
        for (let k = 0; k < 3; k++) {
          const rr = r.r - k * 18;
          if (rr <= 0) continue;
          ctx!.strokeStyle = `rgba(${CYAN}, ${Math.max(0, r.life * 0.22 - k * 0.05)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(r.x, r.y, rr, Math.PI, Math.PI * 2);
          ctx!.stroke();
        }
      }

      // packets
      spawnClock += dt;
      const target = Math.max(4, Math.round(nodes.length / 9));
      if (spawnClock > 22 && packets.length < target) {
        spawnClock = 0;
        spawn();
      }
      packets = packets.filter((p) => p.seg < p.path.length - 1);
      for (const p of packets) {
        const a = nodes[p.path[p.seg]];
        const b = nodes[p.path[p.seg + 1]];
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        p.t += (p.speed * 2.4 * dt) / len;
        if (p.t >= 1) {
          p.t = 0;
          p.seg += 1;
          b.pulse = 1;
        }
        const x = a.x + (b.x - a.x) * Math.min(1, p.t);
        const y = a.y + (b.y - a.y) * Math.min(1, p.t);
        p.trail.push({ x, y });
        if (p.trail.length > 16) p.trail.shift();
        const col = p.hue === "amber" ? AMBER : CYAN;
        // active hop highlight
        ctx!.strokeStyle = `rgba(${col}, 0.35)`;
        ctx!.lineWidth = 1.4;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
        for (let k = 0; k < p.trail.length; k++) {
          const q = p.trail[k];
          const s = k / p.trail.length;
          ctx!.fillStyle = `rgba(${col}, ${s * 0.5})`;
          ctx!.beginPath();
          ctx!.arc(q.x, q.y, 1 + s * 1.6, 0, Math.PI * 2);
          ctx!.fill();
        }
        const g = ctx!.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, `rgba(${col}, 0.9)`);
        g.addColorStop(1, `rgba(${col}, 0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(x, y, 14, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "#fff";
        ctx!.beginPath();
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // nodes
      for (const n of nodes) {
        n.pulse = Math.max(0, n.pulse - 0.02 * dt);
        const breathe = 0.5 + 0.5 * Math.sin(now / 900 + n.phase);
        if (n.pulse > 0) {
          ctx!.strokeStyle = `rgba(${CYAN}, ${n.pulse * 0.7})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 4 + (1 - n.pulse) * 14, 0, Math.PI * 2);
          ctx!.stroke();
        }
        if (n.tower) {
          // little mast
          ctx!.strokeStyle = `rgba(${CYAN}, ${0.35 + n.pulse * 0.5})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(n.x, n.y + 9);
          ctx!.stroke();
        }
        ctx!.fillStyle = `rgba(${n.tower ? CYAN : "245, 245, 245"}, ${0.45 + breathe * 0.25 + n.pulse * 0.3})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.tower ? 2.2 : 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (mouse.active) {
        const g = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 28);
        g.addColorStop(0, `rgba(${CYAN}, 0.5)`);
        g.addColorStop(1, `rgba(${CYAN}, 0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    }

    build();
    if (reduce) {
      // a settled still frame with a few routes drawn
      for (let i = 0; i < 4; i++) spawn();
      packets.forEach((p) => (p.seg = Math.floor(p.path.length / 2)));
      frame(performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      build();
      if (reduce) frame(performance.now());
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onLeave = () => (mouse.active = false);
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !was && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);
    const onVis = () => {
      const was = visible;
      visible = !document.hidden;
      if (visible && !was && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
