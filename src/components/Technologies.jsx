import { technologies } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./Technologies.css";

function Spec({ item }) {
  return (
    <dl className="tech__spec">
      <div>
        <dt>Source</dt>
        <dd>{item.source}</dd>
      </div>
      <div>
        <dt>Degrades in</dt>
        <dd>{item.degrades}</dd>
      </div>
    </dl>
  );
}

/* `standalone` drops the internal heading for the /technology route, which
   already has a page masthead above it. `variant="portfolio"` is the homepage
   framing: the same six technologies presented as a comparison. */
export default function Technologies({ standalone = false, variant }) {
  const scope = useReveal();
  const [lead, ...rest] = technologies.items;
  const isPortfolio = variant === "portfolio";

  return (
    <section
      className={`band technologies${isPortfolio ? " technologies--portfolio" : ""}`}
      id="technology"
      ref={scope}
    >
      <div className="shell">
        {!standalone && (
          <div className="head head--split reveal">
            <div>
              <p className="eyebrow">{isPortfolio ? "Portfolio" : technologies.eyebrow}</p>
              <h2 className="display display--lg technologies__heading">
                {isPortfolio ? "Biopolymer portfolio of TerraOne" : technologies.heading}
              </h2>
            </div>
            <p className="lede">
              {isPortfolio
                ? "A guide to where PHA sits among today's biodegradable polymers, and how it compares with the materials it is built to replace."
                : technologies.body}
            </p>
          </div>
        )}

        <article className="tech tech--lead reveal">
          <div className="tech__masthead">
            <p className="tech__num">01</p>
            <p className="tech__code">{lead.code}</p>
            <p className="tech__full">{lead.full}</p>
            <p className="tech__flag">What we make</p>
            <Spec item={lead} />
          </div>
          <div className="tech__content">
            <p className="tech__body">{lead.body}</p>
            <p className="tech__tradeoff">{lead.tradeoff}</p>
          </div>
        </article>

        <div className="technologies__grid">
          {rest.map((item, i) => (
            <article className="tech reveal" key={item.code} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="tech__masthead">
                <p className="tech__num">{String(i + 2).padStart(2, "0")}</p>
                <p className="tech__code">{item.code}</p>
                <p className="tech__full">{item.full}</p>
              </div>
              <p className="tech__body tech__body--grow">{item.body}</p>
              <p className="tech__tradeoff">{item.tradeoff}</p>
              <Spec item={item} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
