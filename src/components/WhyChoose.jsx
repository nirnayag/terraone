import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { sectors, overview } from "../data/content";
import "./WhyChoose.css";

const AUTOPLAY_MS = 5000;

function WarningGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4.5 21 20H3z" />
      <path d="M12 10v4.5M12 17.2h.01" />
    </svg>
  );
}

function LeafGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4c0 9-6 14-14 14 0-9 6-14 14-14z" />
      <path d="M4 20c3-6 7-9 12-11" />
    </svg>
  );
}

/* Both panels run off one index, so the problem and the solution on screen
   always describe the same sector — which is the point of pairing them. */
function Panel({ kind, title, field, index, onIndex }) {
  const n = sectors.length;
  const at = (offset) => (index + offset + n) % n;
  const move = (dir) => onIndex((index + dir + n) % n);

  const slots = [
    { idx: at(-1), pos: "left" },
    { idx: index, pos: "center" },
    { idx: at(1), pos: "right" },
  ];

  return (
    <article className={`wpanel wpanel--${kind}`}>
      <header className="wpanel__head">
        <span className="wpanel__badge" aria-hidden="true">
          {kind === "problem" ? <WarningGlyph /> : <LeafGlyph />}
        </span>
        <h3 className="wpanel__title">{title}</h3>
        <span className="wpanel__line" aria-hidden="true" />
      </header>

      <div className="wpanel__stage">
        <button className="wpanel__nav wpanel__nav--prev" onClick={() => move(-1)} aria-label={`Previous ${title.toLowerCase()}`}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12.5 4 6.5 10l6 6" />
          </svg>
        </button>

        <ul className="wpanel__cards">
          {slots.map(({ idx, pos }) => {
            const s = sectors[idx];
            return (
              <li className={`wcard is-${pos}`} key={`${pos}-${s.slug}`} aria-hidden={pos !== "center"}>
                <span className="wcard__num">{String(idx + 1).padStart(2, "0")}</span>
                <h4 className="wcard__name">{s.name}</h4>
                <span className="wcard__rule" aria-hidden="true" />
                <p className="wcard__text">{s[field]}</p>
              </li>
            );
          })}
        </ul>

        <button className="wpanel__nav wpanel__nav--next" onClick={() => move(1)} aria-label={`Next ${title.toLowerCase()}`}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m7.5 4 6 6-6 6" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function WhyChoose() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = sectors.length;
  const wrapRef = useRef(null);
  const sproutRef = useRef(null);

  /* advances on its own; stops while the reader is interacting */
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setIndex((v) => (v + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  /* rotate sprout on scroll */
  useEffect(() => {
    const el = sproutRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - rect.top / vh));
        const deg = progress * 45;
        el.style.transform = `rotate(${deg}deg)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="why" id="why">
      {/* behind the content and out of the layout flow, so the header and the
          panels get the full column width */}
      <figure className="why__sprout">
        <img ref={sproutRef} src="/media/decor/sprout.png" alt="" aria-hidden="true" width="436" height="940" />
      </figure>

      <div className="shell">
        <header className="why__head">
          <h2 className="display display--lg why__heading">
            Why choose <span>TerraOne?</span>
          </h2>
          <p className="why__lede">{overview.note}</p>
        </header>

        <div
          className="why__panels"
          ref={wrapRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!wrapRef.current?.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <Panel kind="problem" title="Problem statements" field="problem" index={index} onIndex={setIndex} />
          <Panel kind="solution" title="Solution statements" field="solution" index={index} onIndex={setIndex} />
        </div>

        <ul className="why__dots">
          {sectors.map((s, d) => (
            <li key={s.slug}>
              <button
                className={`why__dot${d === index ? " is-on" : ""}`}
                onClick={() => setIndex(d)}
                aria-label={`Show ${s.name}`}
                aria-current={d === index || undefined}
              />
            </li>
          ))}
        </ul>

        <footer className="why__foot">
          <p className="why__prompt">
            Explore how TerraOne is creating real impact across industries.
          </p>
          <Link className="why__cta" to="/application">
            <span className="why__cta-leaf" aria-hidden="true">
              <LeafGlyph />
            </span>
            Learn more about our solutions
            <span className="why__cta-arrow" aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </section>
  );
}
