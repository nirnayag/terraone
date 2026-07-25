import { Link } from "react-router-dom";
import { applicationPage } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import PageHead from "../components/PageHead";
import "./Application.css";

export default function Application() {
  const scope = useReveal();

  return (
    <>
      <PageHead
        eyebrow="Application"
        title={applicationPage.title}
        lede={applicationPage.lede}
      />

      <section className="band band--tight" ref={scope}>
        <div className="shell">
          <p className="appintro reveal">{applicationPage.intro}</p>

          {/* An index first: ten sectors is too many to scroll blind. */}
          <nav className="appindex reveal" aria-label="Sectors">
            <p className="appindex__key">Jump to</p>
            <ul>
              {applicationPage.sectors.map((s, i) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`}>
                    <span className="appindex__num">{String(i + 1).padStart(2, "0")}</span>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="appsectors">
            {applicationPage.sectors.map((s, i) => (
              <article className="appsector reveal" id={s.slug} key={s.slug}>
                <div className="appsector__media">
                  <img src={s.image} alt="" loading="lazy" />
                </div>
                <div className="appsector__copy">
                  <p className="appsector__num">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display display--md appsector__title">{s.name}</h2>
                  <p className="appsector__body">{s.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="appcta reveal">
            <p className="appcta__body">
              Every sector above needs a different grade. Tell us the application and we will point
              you at the right one.
            </p>
            <div className="appcta__actions">
              <Link className="btn btn--fill" to="/contact">
                Start an enquiry
              </Link>
              <Link className="btn btn--line" to="/products">
                See the catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
