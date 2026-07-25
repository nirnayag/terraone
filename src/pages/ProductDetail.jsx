import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../lib/wp";
import { sanitiseHtml } from "../lib/sanitise";
import { company } from "../data/content";
import { useResource } from "../hooks/useResource";
import Async from "../components/Async";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const state = useResource(() => fetchProduct(slug), [slug]);

  useEffect(() => {
    if (state.status === "ready") document.title = `${state.data.title} — TerraOne`;
  }, [state]);

  return (
    <section className="band band--tight detail">
      <div className="shell">
        <Link className="textlink detail__back" to="/products">
          <span aria-hidden="true">←</span> All products
        </Link>

        <Async state={state} label="this product" rows={4}>
          {(p) => (
            <div className="detail__layout">
              <div className="detail__media">
                {p.image ? (
                  <img className="detail__img" src={p.image.src} alt={p.image.alt || p.title} />
                ) : (
                  <span className="detail__img detail__img--none" aria-hidden="true" />
                )}
              </div>

              <div className="detail__copy">
                {p.categories.length > 0 && (
                  <ul className="detail__cats">
                    {p.categories.map((c) => (
                      <li key={c.slug}>
                        <Link to={`/products?category=${c.slug}`}>{c.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}

                <h1 className="display display--lg detail__title">{p.title}</h1>

                {/* Imported markup, stripped of Elementor styling first. */}
                <div
                  className="prose detail__prose"
                  dangerouslySetInnerHTML={{ __html: sanitiseHtml(p.content || p.excerpt) }}
                />

                <div className="detail__enquiry">
                  <p className="detail__enquiry-key">Pricing</p>
                  <p className="detail__enquiry-body">
                    This catalogue is quoted per application rather than listed. Send the volume,
                    the format and the performance envelope you need and we will come back with a
                    grade and a price.
                  </p>
                  <div className="detail__actions">
                    <a
                      className="btn btn--fill"
                      href={`mailto:${company.email}?subject=${encodeURIComponent(`Enquiry — ${p.title}`)}`}
                    >
                      Enquire about {p.title}
                    </a>
                    <a className="btn btn--line" href={`tel:${company.phoneHref}`}>
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Async>
      </div>
    </section>
  );
}
