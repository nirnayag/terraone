import { useCallback, useEffect, useRef, useState } from "react";
import { overview, sectors } from "../data/content";
import { SectorIcon } from "./SectorIcons";
import { useReveal } from "../hooks/useReveal";
import "./SectorCarousel.css";

/* Scroll-snap rather than a JS slider: the track is a real horizontally
   scrollable list, so trackpad, touch and keyboard all work natively and the
   dots only drive scrollTo. */
export default function SectorCarousel() {
  const scope = useReveal();
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstChild?.clientWidth || 1;
    const perView = Math.max(1, Math.round(el.clientWidth / card));
    const pages = Math.max(1, Math.ceil(sectors.length / perView));
    setPageCount(pages);
    const max = el.scrollWidth - el.clientWidth;
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max / Math.max(1, pageCount - 1)) * i, behavior: "smooth" });
  };

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.firstChild?.clientWidth ?? 320), behavior: "smooth" });
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
            <h2 className="display display--lg wwd__heading">Innovating for a sustainable future</h2>
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

        <ul className="wwd__track" ref={trackRef}>
          {sectors.map((s, i) => (
            <li className={`hex hex--${i % 2 === 0 ? "blue" : "green"}`} key={s.slug}>
              {/* the bracket is a bordered box with only its top corners
                  rounded — the connector line from the design */}
              <span className="hex__bracket" aria-hidden="true">
                <i className="hex__node" />
              </span>

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
