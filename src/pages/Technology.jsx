import { Link } from "react-router-dom";
import { technologies, process } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import PageHead from "../components/PageHead";
import Technologies from "../components/Technologies";
import "./Technology.css";

export default function Technology() {
  const scope = useReveal();

  return (
    <>
      <PageHead eyebrow={technologies.eyebrow} title={technologies.heading} lede={technologies.body} />

      <Technologies standalone />

      <section className="band band--tight techprocess" ref={scope}>
        <div className="shell">
          <div className="head reveal">
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 className="display display--lg">{process.heading}</h2>
            <p className="lede">{process.body}</p>
          </div>

          <ol className="techsteps">
            {process.steps.map((s, i) => (
              <li className="techstep reveal" key={s.title} style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="techstep__num">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="techstep__title">{s.title}</h3>
                  <p className="techstep__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="techcta reveal">
            <p className="techcta__body">
              Not sure which technology fits? Describe the application and we will tell you
              straight — including when PHA is the wrong answer.
            </p>
            <Link className="btn btn--fill" to="/contact">
              Talk to a materials engineer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
