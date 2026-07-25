import { useEffect, useRef } from "react";
import "./Globe3D.css";

/* A real 3D globe — not an image, and not a library.

   Points are distributed over a sphere with the Fibonacci lattice (even
   spacing, no clustering at the poles), rotated in 3D each frame, then
   projected to 2D with perspective. Depth drives both radius and alpha, so
   the far side reads as further away rather than as a flat disc.

   Canvas rather than SVG because ~900 points animating at 60fps would mean
   900 DOM nodes being re-laid-out every frame. Three.js would do this too,
   but it is ~150 KB gzipped for one decorative element. */

const POINTS = 900;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const TILT = -0.42; // radians, fixed lean of the axis
const FOV = 3.2;

/* Rough landmass mask in lat/long space — enough to read as continents
   without shipping a topology file. */
const LAND = [
  { lon: -1.05, lat: 0.62, rx: 0.5, ry: 0.42 }, // north america
  { lon: -0.95, lat: -0.25, rx: 0.26, ry: 0.42 }, // south america
  { lon: 0.25, lat: 0.7, rx: 0.35, ry: 0.28 }, // europe
  { lon: 0.35, lat: -0.05, rx: 0.4, ry: 0.55 }, // africa
  { lon: 1.35, lat: 0.5, rx: 0.75, ry: 0.5 }, // asia
  { lon: 2.3, lat: -0.6, rx: 0.35, ry: 0.25 }, // oceania
];

function buildSphere() {
  const pts = [];
  for (let i = 0; i < POINTS; i += 1) {
    const y = 1 - (i / (POINTS - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GOLDEN;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const lat = Math.asin(y);
    const lon = Math.atan2(z, x);
    const land = LAND.some(
      (c) =>
        ((lon - c.lon) / c.rx) ** 2 + ((lat - c.lat) / c.ry) ** 2 < 1 ||
        ((lon - c.lon + Math.PI * 2) / c.rx) ** 2 + ((lat - c.lat) / c.ry) ** 2 < 1,
    );

    pts.push({ x, y, z, land });
  }
  return pts;
}

function ring(count, tiltX, tiltZ) {
  const pts = [];
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    let x = Math.cos(a);
    let y = 0;
    let z = Math.sin(a);

    // tilt the ring's plane
    const y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX);
    const z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX);
    const x2 = x * Math.cos(tiltZ) - y1 * Math.sin(tiltZ);
    const y2 = x * Math.sin(tiltZ) + y1 * Math.cos(tiltZ);
    x = x2;
    y = y2;
    z = z1;

    pts.push({ x, y, z });
  }
  return pts;
}

export default function Globe3D({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const styles = getComputedStyle(canvas);
    const read = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
    const colDot = read("--globe-dot", "#99d9f3");
    const colLand = read("--globe-land", "#6dbe45");
    const colRingA = read("--globe-ring-a", "#99d9f3");
    const colRingB = read("--globe-ring-b", "#c5e5b5");
    const colPip = read("--globe-pip", "#00a0e1");

    const sphere = buildSphere();
    const ringA = ring(180, 0.95, 0.25);
    const ringB = ring(180, -0.55, -0.35);

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const rotate = (p, a) => {
      // spin around Y, then apply the fixed tilt around X
      const x = p.x * Math.cos(a) - p.z * Math.sin(a);
      const z = p.x * Math.sin(a) + p.z * Math.cos(a);
      const y = p.y * Math.cos(TILT) - z * Math.sin(TILT);
      const z2 = p.y * Math.sin(TILT) + z * Math.cos(TILT);
      return { x, y, z: z2 };
    };

    const draw = (angle) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;

      // orbit rings, drawn behind and in front of the sphere by depth
      const drawRing = (pts, colour, speed, dotEvery) => {
        pts.forEach((p, i) => {
          const r = rotate(p, angle * speed);
          const scale = FOV / (FOV + r.z);
          const px = cx + r.x * R * 1.3 * scale;
          const py = cy + r.y * R * 1.3 * scale;
          const depth = (r.z + 1) / 2; // 0 far, 1 near
          ctx.globalAlpha = 0.28 + depth * 0.55;
          ctx.fillStyle = colour;
          ctx.beginPath();
          ctx.arc(px, py, 1.15 * scale, 0, Math.PI * 2);
          ctx.fill();

          // a travelling pip on each ring
          if (i % dotEvery === 0 && depth > 0.55) {
            ctx.globalAlpha = 0.9;
            ctx.fillStyle = colPip;
            ctx.beginPath();
            ctx.arc(px, py, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      };

      drawRing(ringA, colRingA, 1, 90);
      drawRing(ringB, colRingB, -0.7, 120);

      // sphere points, far side first so the near side overlaps it
      const projected = sphere
        .map((p) => {
          const r = rotate(p, angle);
          const scale = FOV / (FOV + r.z);
          return {
            px: cx + r.x * R * scale,
            py: cy + r.y * R * scale,
            depth: (r.z + 1) / 2,
            scale,
            land: p.land,
          };
        })
        .sort((a, b) => a.depth - b.depth);

      projected.forEach((p) => {
        ctx.globalAlpha = 0.16 + p.depth * 0.8;
        ctx.fillStyle = p.land ? colLand : colDot;
        ctx.beginPath();
        ctx.arc(p.px, p.py, (p.land ? 1.85 : 1.35) * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      draw(0.6);
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = 0;
    let running = true;

    const loop = (t) => {
      if (!start) start = t;
      draw(((t - start) / 1000) * 0.13); // ~48s per revolution
      if (running) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // stop spinning when the section is off screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
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
  }, []);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" />;
}
