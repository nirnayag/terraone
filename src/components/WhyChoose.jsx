import { sectors, overview } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./WhyChoose.css";

/* The reference marks problems with a red cross. Red is not in the TerraOne
   palette, so the two blocks are told apart by slate vs green and by the mark
   itself — and the heading says which is which, so colour is never the only
   signal. */
function Block({ kind, title, items }) {
  return (
    <div className={`why__block why__block--${kind}`}>
      <h3 className="why__blockhead">
        <span className="why__mark" aria-hidden="true">
          {kind === "problem" ? (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8.5 6.5 12 13 4.5" />
            </svg>
          )}
        </span>
        {title}
      </h3>

      <ul className="why__grid">
        {items.map((s, i) => (
          <li className="why__card" key={s.slug}>
            <span className="why__num">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="why__name">{s.name}</h4>
            <p className="why__text">{kind === "problem" ? s.problem : s.solution}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyChoose() {
  const scope = useReveal();

  return (
    <section className="band band--ink why" id="why" ref={scope}>
      <div className="shell">
        <div className="why__head reveal">
          <h2 className="display display--lg why__heading">Why choose TerraOne?</h2>
          <p className="lede">{overview.note}</p>
        </div>

        <div className="why__blocks reveal">
          <Block kind="problem" title="Problem statements" items={sectors} />
          <Block kind="solution" title="Solution statements" items={sectors} />
        </div>
      </div>
    </section>
  );
}
