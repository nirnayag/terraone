import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { technologies } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import DnaHelix from "./DnaHelix";
import { MoleculeMesh, PolymerGlyph, TraitIcon } from "./PortfolioArt";
import "./Technologies.css";

const AUTOPLAY_MS = 6000;

/* Runs under the carousel and repeats the portfolio's overall claims. */
const STRIP = [
  { icon: "dna", label: ["Advanced", "biopolymer tech"] },
  { icon: "molecule", label: ["Renewable", "resources"] },
  { icon: "recycle", label: ["Industrial & home", "compostable"] },
  { icon: "wave", label: ["Marine & soil", "safe"] },
  { icon: "carbon", label: ["Low carbon", "footprint"] },
  { icon: "cube", label: ["Versatile", "applications"] },
];

export default function Technologies({ standalone = false }) {
  const scope = useReveal();
  const [lead, ...rest] = technologies.items;
  const n = rest.length;
  const [index, setIndex] = useState(1); // PBS reads first, as in the design
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setIndex((v) => (v + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  const at = (o) => (index + o + n) % n;
  const slots = [
    { i: at(-2), pos: "far-left" },
    { i: at(-1), pos: "left" },
    { i: index, pos: "center" },
    { i: at(1), pos: "right" },
    { i: at(2), pos: "far-right" },
  ];

  /* number in the design counts PHA as 01, so the rest start at 02 */
  const numberOf = (i) => String(i + 2).padStart(2, "0");

  return (
    <section className="matport" id="technology" ref={scope}>
      <span className="matport__dna" aria-hidden="true">
        <DnaHelix className="dna" speed={0.2} />
      </span>
      <MoleculeMesh className="matport__mesh" />

      <div className="shell matport__shell">
        {!standalone && (
          <header className="matport__head reveal">
            <p className="matport__eyebrow">
              Material portfolio <span aria-hidden="true" />
            </p>
            <h2 className="matport__heading">
              Biopolymer portfolio
              <br />
              of <span>TerraOne</span>
            </h2>
            <p className="matport__sub">
              A guide to where PHA sits among today&rsquo;s biodegradable polymers — and how it
              compares with the materials it is built to replace.
            </p>
          </header>
        )}

        {/* ---- the core material ---- */}
        <article className="phacard reveal">
          <span className="phacard__helix" aria-hidden="true">
            <DnaHelix className="dna dna--ink" speed={0.3} />
          </span>

          <div className="phacard__id">
            <span className="phacard__pill">Core material</span>
            <p className="phacard__num">01</p>
            <h3 className="phacard__code">{lead.code}</h3>
            <p className="phacard__full">{lead.full}</p>
          </div>

          <div className="phacard__body">
            <p className="phacard__text">{lead.short}</p>
            <ul className="phacard__traits">
              {lead.traits.map((t) => (
                <li key={t}>
                  <TraitIcon name={t} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <MoleculeMesh className="phacard__mesh" />
        </article>

        {/* ---- the comparison set ---- */}
        <div
          className="polytrack"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            className="polytrack__nav polytrack__nav--prev"
            onClick={() => setIndex(at(-1))}
            aria-label="Previous polymer"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" /></svg>
          </button>

          <ul className="polytrack__cards">
            {slots.map(({ i, pos }) => {
              const t = rest[i];
              return (
                <li className={`polycard is-${pos}`} key={`${pos}-${t.code}`} aria-hidden={pos !== "center"}>
                  <span className="polycard__num">{numberOf(i)}</span>
                  <span className="polycard__glyph" aria-hidden="true">
                    <PolymerGlyph code={t.code} />
                  </span>
                  <h4 className="polycard__code">{t.code}</h4>
                  <p className="polycard__full">{t.full}</p>
                  <p className="polycard__text">{t.short}</p>

                  {pos === "center" && (
                    <>
                      <ul className="polycard__traits">
                        {t.traits.map((x) => (
                          <li key={x}>
                            <TraitIcon name={x} />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                      <Link className="polycard__cta" to="/technology">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            className="polytrack__nav polytrack__nav--next"
            onClick={() => setIndex(at(1))}
            aria-label="Next polymer"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m7.5 4 6 6-6 6" /></svg>
          </button>
        </div>

        <ul className="polytrack__dots">
          {rest.map((t, d) => (
            <li key={t.code}>
              <button
                className={`polytrack__dot${d === index ? " is-on" : ""}`}
                onClick={() => setIndex(d)}
                aria-label={`Show ${t.code}`}
                aria-current={d === index || undefined}
              />
            </li>
          ))}
        </ul>

        {/* ---- claims strip ---- */}
        <ul className="matport__strip reveal">
          {STRIP.map((s) => (
            <li key={s.label.join(" ")}>
              <span className="matport__strip-icon" aria-hidden="true">
                <TraitIcon name={s.icon} />
              </span>
              <p>
                {s.label[0]}
                <br />
                {s.label[1]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
