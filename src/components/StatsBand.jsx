import { metrics } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import { Waves, Halftone, cardArt } from "./StatsDecor";
import Globe3D from "./Globe3D";
import "./StatsBand.css";

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function LeafGlyph(props) {
  return (
    <svg {...iconBase} {...props}>
      <path d="M12 21v-7" />
      <path d="M12 14c0-4 3.2-7 7-7 0 4-3.2 7-7 7z" />
      <path d="M12 17c0-3.1-2.6-5.6-5.7-5.6 0 3.1 2.6 5.6 5.7 5.6z" />
    </svg>
  );
}

function MetricIcon({ type }) {
  if (type === "factory") {
    return (
      <svg {...iconBase}>
        <path d="M3 21V9l5 3V9l5 3V7h8v14H3z" />
        <path d="M17 7V3h4v4" />
        <path d="M7 17h2M12 17h2M17 17h2" />
      </svg>
    );
  }

  if (type === "leaf") return <LeafGlyph />;

  if (type === "people") {
    return (
      <svg {...iconBase}>
        <path d="M16 20c0-2.2-1.8-4-4-4s-4 1.8-4 4" />
        <circle cx="12" cy="10" r="3" />
        <path d="M20.5 19.5c0-1.7-1-3-2.5-3.6" />
        <path d="M17 6.8a2.6 2.6 0 0 1 0 4.9" />
        <path d="M3.5 19.5c0-1.7 1-3 2.5-3.6" />
        <path d="M7 6.8a2.6 2.6 0 0 0 0 4.9" />
      </svg>
    );
  }

  return (
    <svg {...iconBase}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4" />
      <path d="M12 3.5c2.2 2.2 3.4 5 3.4 8.5s-1.2 6.3-3.4 8.5" />
      <path d="M12 3.5C9.8 5.7 8.6 8.5 8.6 12s1.2 6.3 3.4 8.5" />
    </svg>
  );
}

export default function StatsBand() {
  const scope = useReveal();
  const iconTypes = ["globe", "factory", "leaf", "people"];

  return (
    <section className="statsband" ref={scope}>
      <div className="statsband__decor" aria-hidden="true">
        <Globe3D className="statsband__globe globe3d" />
        <Waves />
        <Halftone className="statsband__halftone statsband__halftone--top" />
        <Halftone className="statsband__halftone statsband__halftone--bottom" />
      </div>

      <div className="shell statsband__shell">
        <header className="statsband__head reveal">
          <p className="statsband__pill">
            <LeafGlyph strokeWidth="1.6" />
            About TerraOne
          </p>

          <h2 className="statsband__heading">
            <span className="is-blue">Built</span> for global industries.
            <br />
            Trusted through <span className="is-green">innovation.</span>
          </h2>

          <p className="statsband__sub">
            From breakthrough materials to reliable production,
            <br />
            we deliver sustainable solutions that industries can depend on.
          </p>
        </header>

        <ul className="statsband__grid">
          {metrics.map((m, i) => {
            const Art = cardArt[i % cardArt.length];
            return (
              <li
                className={`stat stat--${i < 2 ? "blue" : "green"} reveal`}
                key={m.label}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="stat__icon" aria-hidden="true">
                  <MetricIcon type={iconTypes[i]} />
                </span>

                <span className="stat__dash" aria-hidden="true" />

                <p className="stat__figure">
                  {m.figure}
                  {m.unit && <span className="stat__unit">{m.unit}</span>}
                </p>

                <p className="stat__label">{m.label}</p>

                <span className="stat__dash stat__dash--low" aria-hidden="true" />

                <p className="stat__detail">{m.detail}</p>

                <span className="stat__artwrap" aria-hidden="true">
                  <Art />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
