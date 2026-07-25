import { useCallback, useEffect, useRef, useState } from "react";
import { overview, sectors } from "../data/content";
import { SectorIcon } from "./SectorIcons";
import { useReveal } from "../hooks/useReveal";
import { useRailPath } from "../hooks/useRailPath";
import "./SectorCarousel.css";

export default function SectorCarousel() {
  const scope = useReveal();
  const viewportRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  /* The rail lives outside the cards and is measured from them. */
  const { innerRef, setCardRef, rail } = useRailPath(sectors.length);

  const measurePages = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector(".hex")?.clientWidth || 1;
    const perView = Math.max(1, Math.round(el.clientWidth / card));
    const pages = Math.max(1, Math.ceil(sectors.length / perView));
    setPageCount(pages);
    const max = el.scrollWidth - el.clientWidth;
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1)));
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    measurePages();
    el.addEventListener("scroll", measurePages, { passive: true });
    const ro = new ResizeObserver(measurePages);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measurePages);
      ro.disconnect();
    };
  }, [measurePages]);

  const goTo = (i) => {
    const el = viewportRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max / Math.max(1, pageCount - 1)) * i, behavior: "smooth" });
  };

  const nudge = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.querySelector(".hex")?.clientWidth ?? 320), behavior: "smooth" });
  };

  return (
    <section className="wwd" id="who-we-are" ref={scope}>
      <div className="shell">
        <div className="wwd__head reveal">
          <div className="wwd__intro">
            <p className="wwd__eyebrow">
              <span className="wwd__rule" aria-hidden="true" />
              What we do
            </p>
            <h2 className="display display--lg wwd__heading">{overview.heading}</h2>
            <span className="wwd__dotgrid" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} />
              ))}
            </span>
          </div>

          <div className="wwd__aside">
            <div className="wwd__lead">
              <span className="wwd__node" aria-hidden="true" />
              <p>{overview.body}</p>
            </div>

            <div className="wwd__note">
              <span className="wwd__noteicon" aria-hidden="true">
                <SectorIcon slug="agriculture" />
              </span>
              <p>{overview.note}</p>
            </div>
          </div>
        </div>

        {/* viewport scrolls; inner holds the rail and the cards in one
            coordinate space, so the rail travels with the row */}
        <div className="wwd__viewport" ref={viewportRef}>
          <div className="wwd__inner" ref={innerRef}>
            <svg
              className="wwd__rail"
              style={{ height: rail.height }}
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                {rail.gaps.map((g) => (
                  <linearGradient
                    key={g.id}
                    id={g.id}
                    gradientUnits="userSpaceOnUse"
                    x1={g.x1}
                    y1="0"
                    x2={g.x2}
                    y2="0"
                  >
                    <stop offset="0" stopColor={g.from} />
                    <stop offset="1" stopColor={g.to} />
                  </linearGradient>
                ))}
              </defs>

              {rail.paths.map((p, i) => (
                <path key={`t${i}`} d={p.d} stroke={p.stroke} />
              ))}
              {rail.gaps.map((g) => (
                <path key={g.id} d={g.d} stroke={`url(#${g.id})`} />
              ))}
              {rail.nodes.map((n, i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r={rail.nodeR} stroke={n.stroke} />
              ))}
            </svg>

            <ul className="wwd__track">
              {sectors.map((s, i) => (
                <li
                  className={`hex hex--${i % 2 === 0 ? "blue" : "green"}`}
                  key={s.slug}
                  ref={setCardRef(i)}
                >
                  <span className="hex__badge" aria-hidden="true">
                    <SectorIcon slug={s.slug} />
                  </span>

                  <div className="hex__card">
                    <p className="hex__num">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="hex__title">{s.name}</h3>
                    <span className="hex__underline" aria-hidden="true" />
                    <p className="hex__body">{s.lede}</p>
                  </div>

                  <span className="hex__flow" aria-hidden="true">
                    →
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="wwd__controls">
          <button className="wwd__arrow" onClick={() => nudge(-1)} aria-label="Previous sectors">
            <span aria-hidden="true">←</span>
          </button>

          <ul className="wwd__dots">
            {Array.from({ length: pageCount }, (_, i) => (
              <li key={i}>
                <button
                  className={`wwd__dot${i === page ? " is-on" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to sector group ${i + 1} of ${pageCount}`}
                  aria-current={i === page || undefined}
                />
              </li>
            ))}
          </ul>

          <button className="wwd__arrow" onClick={() => nudge(1)} aria-label="Next sectors">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
