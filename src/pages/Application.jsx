import { Link } from "react-router-dom";
import { applicationPage, sectors } from "../data/content";
import { SectorIcon } from "../components/SectorIcons";
import { useReveal } from "../hooks/useReveal";
import "./Application.css";

/* The same ten sectors the home page carries, in this page's own order.
   Biomedical and Pharmaceutical are one sector now, so listing them apart
   here would contradict the rest of the site. */
const ALL_SECTORS = [
  "packaging",
  "aquaculture",
  "animal-husbandry",
  "agriculture",
  "food-and-beverages",
  "cosmetics",
  "wastewater",
  "biomedical-healthcare",
  "textile",
  "personal-care",
];

/* Where a sector already has a product category, the arrow goes to the
   catalogue filtered to it; everything else routes to an enquiry. */
const CATALOGUE = {
  packaging: "packaging",
  aquaculture: "aquaculture-fisheries",
  "animal-husbandry": "animal-husbandry",
  agriculture: "agriculture-horticulture",
};

const bySlug = (slug) =>
  sectors.find((s) => s.slug === slug) ??
  applicationPage.sectors.find((s) => s.slug === slug);

const linkFor = (slug) =>
  CATALOGUE[slug] ? `/products?category=${CATALOGUE[slug]}` : "/contact";

/* Titles set their initial in green, as in the design. */
function SplitTitle({ text }) {
  return (
    <>
      <span className="approw__initial">{text.charAt(0)}</span>
      {text.slice(1)}
    </>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h11M10.5 5 15.5 10l-5 5" />
    </svg>
  );
}

export default function Application() {
  const scope = useReveal();
  const allSectors = ALL_SECTORS.map(bySlug).filter(Boolean);

  return (
    <div className="apppage" ref={scope}>
      {/* ---------- hero ---------- */}
      <section className="apphero">
        <div className="shell apphero__inner">
          <div className="apphero__copy reveal">
            <p className="apphero__eyebrow">
              <span aria-hidden="true" />
              Application
            </p>
            <h1 className="apphero__heading">
              Where our materials
              <br />
              <span>make an impact</span>
            </h1>
            <p className="apphero__lede">{applicationPage.intro}</p>
          </div>

          <div className="collage reveal" aria-hidden="true">
            <figure className="collage__tile collage__tile--a">
              <img src={bySlug("agriculture").image} alt="" loading="lazy" />
            </figure>
            <figure className="collage__tile collage__tile--b">
              <img src={bySlug("animal-husbandry").image} alt="" loading="lazy" />
            </figure>
            <figure className="collage__tile collage__tile--c">
              <img src={bySlug("aquaculture").image} alt="" loading="lazy" />
            </figure>
            <span className="collage__leaf" />
            <span className="collage__dots" />
          </div>
        </div>
      </section>

      {/* ---------- all sectors in one list ---------- */}
      <section className="approws">
        <div className="shell">
          <ul>
            {allSectors.map((s, i) => (
              <li className="approw reveal" key={s.slug} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="approw__icon" aria-hidden="true">
                  <SectorIcon slug={s.slug} />
                </span>

                <div className="approw__copy">
                  <h2 className="approw__title">
                    <SplitTitle text={s.name} />
                  </h2>
                  <p className="approw__text">{s.lede}</p>
                </div>

                <figure className="approw__media">
                  <img src={s.image} alt="" loading="lazy" />
                  <Link
                    className="approw__go"
                    to={linkFor(s.slug)}
                    aria-label={`Explore ${s.name}`}
                  >
                    <Arrow />
                  </Link>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section className="appcta">
        <div className="shell">
          <div className="appcta__panel reveal">
            <span className="appcta__leaf" aria-hidden="true">
              <SectorIcon slug="agriculture" />
            </span>

            <div className="appcta__copy">
              <p className="appcta__text">
                Every sector above needs a different grade. Tell us the application and we will
                point you at the right one.
              </p>
              <div className="appcta__actions">
                <Link className="appcta__btn appcta__btn--fill" to="/contact">
                  Start a project <span aria-hidden="true">→</span>
                </Link>
                <Link className="appcta__btn appcta__btn--line" to="/technology">
                  See the grades
                </Link>
              </div>
            </div>

            <figure className="appcta__media" aria-hidden="true">
              <img src={bySlug("agriculture").image} alt="" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}


