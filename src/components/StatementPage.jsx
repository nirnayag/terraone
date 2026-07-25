import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import PageHead from "./PageHead";
import "./StatementPage.css";

/* Shared shape for the narrative pages: a masthead, a run of titled blocks,
   an optional data strip, and a closing action. */
export default function StatementPage({ eyebrow, title, lede, intro, blocks = [], facts, cta }) {
  const scope = useReveal();

  return (
    <>
      <PageHead eyebrow={eyebrow} title={title} lede={lede} />

      <section className="band band--tight" ref={scope}>
        <div className="shell">
          {intro && <p className="statement__intro reveal">{intro}</p>}

          {facts && (
            <ul className="statement__facts reveal">
              {facts.map((f) => (
                <li key={f.label}>
                  <p className="statement__figure">{f.figure}</p>
                  <p className="statement__label">{f.label}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="statement__blocks">
            {blocks.map((b, i) => (
              <article className="statement__block reveal" key={b.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <h2 className="statement__title">{b.title}</h2>
                <p className="statement__body">{b.body}</p>
              </article>
            ))}
          </div>

          {cta && (
            <div className="statement__cta reveal">
              <p className="statement__cta-body">{cta.body}</p>
              <div className="statement__cta-actions">
                {cta.actions.map((a) =>
                  a.to ? (
                    <Link key={a.label} className={`btn ${a.kind === "line" ? "btn--line" : "btn--fill"}`} to={a.to}>
                      {a.label}
                    </Link>
                  ) : (
                    <a key={a.label} className={`btn ${a.kind === "line" ? "btn--line" : "btn--fill"}`} href={a.href}>
                      {a.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
