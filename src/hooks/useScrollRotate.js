import { useEffect, useRef } from "react";

/* Rotates an element based on scroll position. Usage:
   const ref = useScrollRotate({ speed: 0.15 });
   <img ref={ref} ... /> */
export function useScrollRotate({ speed = 0.1 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = 1 - rect.top / vh;
        const deg = progress * 360 * speed;
        el.style.transform = `rotate(${deg}deg)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return ref;
}
