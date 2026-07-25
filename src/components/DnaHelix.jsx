import { useEffect, useRef } from "react";
import "./DnaHelix.css";

/* A real double helix, not an image.

   Two backbones run up the canvas a half-turn out of phase. Each node's x and
   z come from a circle, so as the phase advances the strands genuinely wind
   around each other and cross over — depth drives node size and alpha, and
   everything is z-sorted, which is what makes the near strand pass in front
   of the far one instead of the two just overlapping.

   Canvas for the same reason as the globe: this is ~120 nodes plus rungs
   redrawn every frame, and that many animated DOM elements would be wasteful. */

const NODES = 64; // per strand
const TURNS = 2.6;
const RUNG_EVERY = 3;
const FOV = 3.4;

export default function DnaHelix({ className, speed = 0.22, radius = 0.3, dot = 3.1, turns = TURNS }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const styles = getComputedStyle(canvas);
    const read = (n, fb) => styles.getPropertyValue(n).trim() || fb;
    const colA = read("--dna-a", "#6dbe45");
    const colB = read("--dna-b", "#00a0e1");
    const colRung = read("--dna-rung", "#c5e5b5");

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = (phase) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const R = w * radius;
      const top = h * 0.06;
      const span = h * 0.88;

      const strand = (offset) =>
        Array.from({ length: NODES }, (_, i) => {
          const f = i / (NODES - 1);
          const t = f * turns * Math.PI * 2 + phase + offset;
          const z = Math.sin(t);
          const scale = FOV / (FOV + z);
          return {
            x: cx + Math.cos(t) * R * scale,
            y: top + f * span,
            depth: (z + 1) / 2,
            scale,
          };
        });

      const a = strand(0);
      const b = strand(Math.PI);

      // rungs first, so the nodes sit on top of them
      for (let i = 0; i < NODES; i += RUNG_EVERY) {
        const depth = (a[i].depth + b[i].depth) / 2;
        ctx.globalAlpha = 0.22 + depth * 0.5;
        ctx.strokeStyle = colRung;
        ctx.lineWidth = 1.1 * ((a[i].scale + b[i].scale) / 2);
        ctx.beginPath();
        ctx.moveTo(a[i].x, a[i].y);
        ctx.lineTo(b[i].x, b[i].y);
        ctx.stroke();
      }

      // nodes, far ones first
      const all = [
        ...a.map((p) => ({ ...p, colour: colA })),
        ...b.map((p) => ({ ...p, colour: colB })),
      ].sort((p, q) => p.depth - q.depth);

      all.forEach((p) => {
        ctx.globalAlpha = 0.25 + p.depth * 0.75;
        ctx.fillStyle = p.colour;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dot * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(0.8);
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = 0;
    let running = true;

    const loop = (t) => {
      if (!start) start = t;
      draw(((t - start) / 1000) * speed);
      if (running) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [speed, radius, dot, turns]);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />;
}
