import { metrics } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./StatsBand.css";

export default function StatsBand() {
  const scope = useReveal();

  return (
    <section className="band band--ink statsband" ref={scope}>
      <div className="shell">
        <h2 className="display display--lg statsband__heading reveal">
          Built for global industries.
          <br />
          Trusted through innovation.
        </h2>

        <ul className="statsband__grid">
          {metrics.map((m, i) => (
            <li className="stat reveal" key={m.label} style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="stat__figure">
                {m.figure}
                {m.unit && <span className="stat__unit">{m.unit}</span>}
              </p>
              <p className="stat__label">{m.label}</p>
              <p className="stat__detail">{m.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
