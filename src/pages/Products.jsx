import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchProducts, fetchProductCategories, fetchProductMedia } from "../lib/wp";
import { useResource } from "../hooks/useResource";
import Async from "../components/Async";
import PageHead from "../components/PageHead";
import "./Products.css";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "";

  const cats = useResource(() => fetchProductCategories(), []);
  const state = useResource(
    () => fetchProducts({ perPage: 50, category: category || undefined }),
    [category],
  );

  const select = (slug) => {
    const p = new URLSearchParams();
    if (slug) p.set("category", slug);
    setParams(p);
  };

  const activeCat = cats.data?.find((c) => c.slug === category);

  /* Images arrive after the cards; until then each frame holds its space. */
  const mediaIds = useMemo(
    () => (state.data?.items ?? []).map((p) => p.mediaId).filter(Boolean),
    [state.data],
  );
  const mediaKey = mediaIds.join(",");
  const media = useResource(
    () => (mediaIds.length ? fetchProductMedia(mediaIds) : Promise.resolve(new Map())),
    [mediaKey],
  );

  return (
    <>
      <PageHead
        eyebrow="Products"
        title="The catalogue"
        lede="Finished materials and biological inputs built on TerraOne PHA. Every line is quoted per application — tell us the volume and the spec and we will price it."
      />

      <section className="band band--tight">
        <div className="shell products__layout">
          <aside className="filters" aria-label="Product categories">
            <p className="filters__key">Category</p>
            {cats.status === "ready" && (
              <ul className="filters__list">
                <li>
                  <button
                    className={`filters__btn${!category ? " is-on" : ""}`}
                    onClick={() => select("")}
                    aria-current={!category || undefined}
                  >
                    All products
                  </button>
                </li>
                {cats.data.map((c) => (
                  <li key={c.slug}>
                    <button
                      className={`filters__btn${category === c.slug ? " is-on" : ""}`}
                      onClick={() => select(c.slug)}
                      aria-current={category === c.slug || undefined}
                    >
                      {c.name}
                      <span className="filters__count">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <div className="products__main">
            <Async
              state={state}
              label="products"
              rows={5}
              empty={
                <>
                  <p className="async__title">No products in this category</p>
                  <p className="async__body">Nothing is listed here yet. Browse the full catalogue instead.</p>
                  <button className="btn btn--fill" onClick={() => select("")}>
                    Show all products
                  </button>
                </>
              }
            >
              {({ items, total }) => (
                <>
                  <p className="products__count datum">
                    {total} {total === 1 ? "product" : "products"}
                    {activeCat ? ` in ${activeCat.name}` : ""}
                  </p>

                  <ul className="products__grid">
                    {items.map((p) => {
                      const image = media.data?.get(p.mediaId);
                      return (
                      <li className="card" key={p.id}>
                        <Link className="card__link" to={`/products/${p.slug}`}>
                          <span className="card__frame">
                            {image ? (
                              <img
                                className="card__img"
                                src={image.small}
                                alt=""
                                loading="lazy"
                                width="300"
                                height="300"
                              />
                            ) : (
                              <span className="card__img card__img--none" aria-hidden="true" />
                            )}
                          </span>
                          <span className="card__body">
                            <span className="card__cats">
                              {p.categories.map((c) => c.name).join(" · ")}
                            </span>
                            <span className="card__name">{p.title}</span>
                            {p.excerpt && <span className="card__excerpt">{p.excerpt}</span>}
                            <span className="card__go" aria-hidden="true">
                              Details →
                            </span>
                          </span>
                        </Link>
                      </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </Async>
          </div>
        </div>
      </section>
    </>
  );
}
