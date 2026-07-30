import { useEffect, useState } from "react";
import { technologies } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import DnaHelix from "./DnaHelix";
import { TraitIcon } from "./PortfolioArt";
import "./Technologies.css";

const AUTOPLAY_MS = 6000;

export default function Technologies({ standalone = false, selectedIndex, onSelect }) {
  const scope = useReveal();
  const items = technologies.items;
  const n = items.length;
  const [index, setIndex] = useState(selectedIndex ?? 0);
  const [paused, setPaused] = useState(false);
  const active = items[index];

  useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex !== null) {
      setIndex(selectedIndex);
    }
  }, [selectedIndex]);

  const handleSelectIndex = (idx) => {
    setIndex(idx);
    if (onSelect) onSelect(idx);
  };

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setIndex((v) => (v + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, n]);

  const move = (d) => setIndex((v) => (v + d + n) % n);

  return (
    <section className="matport" id="technology" ref={scope}>
      <span className="matport__dna" aria-hidden="true">
        <DnaHelix className="dna" speed={0.16} radius={0.3} dot={5} turns={3} />
      </span>

      <div className="matport__shell">
        {!standalone && (
          <header className="matport__head reveal">
            <p className="matport__eyebrow">
              Material portfolio <span aria-hidden="true" />
            </p>
            <h2 className="display display--lg matport__heading">
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

        {/* ---- all six, side by side ---- */}
        <div
          className="polyrow"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="polyrow__nav polyrow__nav--prev" onClick={() => move(-1)} aria-label="Previous polymer">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" /></svg>
          </button>

          <ul className="polyrow__cards">
            {items.map((t, i) => (
              <li key={t.code}>
                <button
                  className={`pcard${i === index ? " is-on" : ""}`}
                  onClick={() => handleSelectIndex(i)}
                  aria-pressed={i === index}
                >
                  <span className="pcard__top">
                    <span className="pcard__num">{String(i + 1).padStart(2, "0")}</span>
                    {i === index && <span className="pcard__flag">Active</span>}
                  </span>
                  <span className="pcard__code">{t.code}</span>
                  <span className="pcard__full">{t.full}</span>
                </button>
              </li>
            ))}
          </ul>

          <button className="polyrow__nav polyrow__nav--next" onClick={() => move(1)} aria-label="Next polymer">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m7.5 4 6 6-6 6" /></svg>
          </button>
        </div>

        <ul className="polyrow__dots">
          {items.map((t, d) => (
            <li key={t.code}>
              <button
                className={`polyrow__dot${d === index ? " is-on" : ""}`}
                onClick={() => handleSelectIndex(d)}
                aria-label={`Show ${t.code}`}
                aria-current={d === index || undefined}
              />
            </li>
          ))}
        </ul>

        {/* ---- detail for the selected polymer ---- */}
        <article className="pdetail" key={active.code}>
          <div className="pdetail__id">
            <p className="pdetail__head">
              <span className="pdetail__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="pdetail__code">{active.code}</span>
            </p>
            <p className="pdetail__full">{active.full}</p>
            <p className="pdetail__text">{active.short}</p>
          </div>

          <div className="pdetail__props">
            <p className="pdetail__label">
              Key properties <span aria-hidden="true" />
            </p>
            <ul>
              {active.properties.map((x) => (
                <li key={x}>
                  <TraitIcon name={x} />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="pdetail__apps">
            <p className="pdetail__label pdetail__label--blue">
              Typical applications <span aria-hidden="true" />
            </p>
            <ul className="pdetail__appgrid">
              {active.applications.map((x) => (
                <li key={x}>
                  <span className="pdetail__appicon" aria-hidden="true">
                    <TraitIcon name={x} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>

            <p className="pdetail__label pdetail__label--sm">Compostability</p>
            <ul className="pdetail__compost">
              {active.compost.map((c) => (
                <li key={c.env} className={`is-${c.state}`}>
                  <TraitIcon name={c.env} />
                  <span>
                    {c.env}
                    <em>{c.state === "yes" ? "Yes" : "Not rated"}</em>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

      </div>
    </section>
  );
}
