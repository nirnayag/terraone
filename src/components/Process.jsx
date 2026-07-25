import { process } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./Process.css";

export default function Process() {
  const scope = useReveal();

  return (
    <section className="band band--tight process" id="compounding" ref={scope}>
      <div className="shell">
        <div className="head head--split reveal">
          <div>
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 className="display display--lg process__heading">{process.heading}</h2>
          </div>
          <p className="lede">{process.body}</p>
        </div>

        {/* Numbered because the content genuinely is a sequence — feedstock
            cannot come after extraction. */}
        <ol className="process__steps">
          {process.steps.map((s, i) => (
            <li className="step reveal" key={s.title} style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="step__num">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
