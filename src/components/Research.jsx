import { research } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./Research.css";

export default function Research() {
  const scope = useReveal();

  return (
    <section className="band band--tight research" ref={scope}>
      <div className="shell research__inner">
        <div className="research__intro reveal">
          <p className="eyebrow">{research.eyebrow}</p>
          <h2 className="display display--lg research__heading">{research.heading}</h2>
          <p className="lede research__body">{research.body}</p>
          <a className="textlink research__cta" href={research.cta.href}>
            {research.cta.label} <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="research__pillars">
          {research.pillars.map((p, i) => (
            <li className="pillar reveal" key={p.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
