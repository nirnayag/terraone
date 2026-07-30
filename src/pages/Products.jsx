import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts, fetchProductCategories, fetchProductMedia } from "../lib/wp";
import { useResource } from "../hooks/useResource";
import Async from "../components/Async";
import "./Products.css";

/* ══════════════════════════════════════════════════════════════════
   CATEGORY ICONS — keyed by the product_cat slug in WordPress.
   A category added in wp-admin shows up with the fallback icon rather
   than disappearing, so the bar never goes out of sync with the API.
   ══════════════════════════════════════════════════════════════════ */
const ALL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const CATEGORY_ICONS = {
  packaging: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  "agriculture-horticulture": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22V12" />
      <path d="M12 12C12 7 7 4 3 5c0 5 3 10 9 10z" />
      <path d="M12 12c0-5 5-8 9-7 0 5-3 10-9 10z" />
    </svg>
  ),
  "animal-husbandry": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 00-5 5c0 3.5 2.5 6 6 6s6-2.5 6-6a5 5 0 00-7-5z" />
    </svg>
  ),
  "aquaculture-fisheries": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 12c.94-2.07 3.08-3.5 5.5-3.5s4.56 1.43 5.5 3.5c-.94 2.07-3.08 3.5-5.5 3.5s-4.56-1.43-5.5-3.5z" />
      <path d="M18 12l4-3v6l-4-3z" />
      <circle cx="10" cy="11" r="1" fill="currentColor" />
    </svg>
  ),
  sr30: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 19l-4-4 4-4" />
      <path d="M3 15h11a4 4 0 004-4V5" />
      <path d="M17 5l4 4-4 4" />
    </svg>
  ),
};

const iconFor = (slug) => CATEGORY_ICONS[slug] ?? ALL_ICON;

/* ══════════════════════════════════════════════════════════════════
   CATEGORY BAR — its own request so the tabs paint while the grid
   is still loading, and so they survive a failed product listing.
   ══════════════════════════════════════════════════════════════════ */
function CategoryBar({ active, onSelect }) {
  const state = useResource(() => fetchProductCategories(), []);
  const fromApi = state.status === "ready" ? state.data : [];
  const tabs = [{ slug: "", name: "All products", icon: ALL_ICON }].concat(
    fromApi.map((c) => ({ slug: c.slug, name: c.name, icon: iconFor(c.slug) })),
  );

  return (
    <div className="products-cats__bar">
      {tabs.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <button
            key={cat.slug || "all"}
            onClick={() => onSelect(cat.slug)}
            className={`products-cats__tab ${isActive ? "is-active" : ""}`}
          >
            <div className="products-cats__icon">{cat.icon}</div>
            <span className="products-cats__name">{cat.name}</span>
            {isActive && <div className="products-cats__active-line" />}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PRODUCT IMAGES — the listing only carries media IDs, so the images
   are a second request. Cards render immediately against the frame's
   background and fill in when it lands, rather than holding the whole
   grid back on a host with a ~2s floor.
   ══════════════════════════════════════════════════════════════════ */
function useProductImages(items) {
  const [media, setMedia] = useState(new Map());
  /* Sorted so that flipping A-Z to Z-A reorders the same IDs into the
     same key — otherwise it reads as a new URL and refetches 127 KB. */
  const ids = [...new Set(items.map((p) => p.mediaId).filter(Boolean))].sort((a, b) => a - b);
  const key = ids.join(",");

  useEffect(() => {
    if (!key) return undefined;
    let alive = true;
    fetchProductMedia(key.split(",").map(Number))
      .then((m) => alive && setMedia(m))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [key]);

  return media;
}

function ProductGrid({ items, onClearCategory }) {
  const media = useProductImages(items);

  if (!items.length) {
    return (
      <div className="products-empty">
        <h3>No products found in this category</h3>
        <p>Try selecting another category or viewing all products.</p>
        <button onClick={() => onClearCategory()} className="products-empty__btn">
          Show all products
        </button>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {items.map((p) => {
        const image = media.get(p.mediaId);
        return (
          <div key={p.id} className="product-card">
            <Link to={`/products/${p.slug}`} className="product-card__link">
              {/* Top Product Image Container — stays an empty frame until
                  the media request lands, rather than flashing a stand-in
                  image that then swaps out under the reader. */}
              <div className="product-card__image-frame">
                {image && (
                  <img
                    src={image.small}
                    alt={image.alt || p.title}
                    className="product-card__img"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Bottom Card Body */}
              <div className="product-card__body">
                <div className="product-card__cat-label">
                  {p.categories[0]?.name.toUpperCase() ?? ""}
                </div>
                <h3 className="product-card__title">{p.title}</h3>
                <p className="product-card__excerpt">{p.excerpt}</p>
                <div className="product-card__arrow">
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? "";
  const [sortBy, setSortBy] = useState("a-z");

  useEffect(() => {
    document.title = "Products — TerraOne";
  }, []);

  const state = useResource(
    () => fetchProducts({ perPage: 24, category: activeCategory || undefined }),
    [activeCategory],
  );

  const selectCategory = (slug) => {
    const p = new URLSearchParams();
    if (slug) p.set("category", slug);
    setParams(p);
  };

  /* Sorting stays client-side: the catalogue is one page of 24, so
     re-querying WordPress to reverse an alphabet would be a wasted
     ~7s round trip. */
  const sorted = useMemo(() => {
    const items = state.data?.items ?? [];
    const dir = sortBy === "z-a" ? -1 : 1;
    return [...items].sort((a, b) => dir * a.title.localeCompare(b.title));
  }, [state.data, sortBy]);

  return (
    <div className="products-page">
      {/* ══════════════════════════════════════════════════════════════════
          §01 HERO SECTION — Full-bleed background image
      ══════════════════════════════════════════════════════════════════ */}
      <section className="products-hero">
        <div className="shell products-hero__shell">
          <div className="products-hero__content">
            <div className="products-hero__eyebrow">
              <span className="products-hero__eyebrow-dot" />
              <span>PRODUCTS</span>
            </div>

            <h1 className="products-hero__title">The catalogue</h1>

            <p className="products-hero__lead">
              Finished materials and biological inputs built on TerraOne PHA.
            </p>
            <p className="products-hero__sublead">
              Every line is curated per application — tell us the volume and the spec and we will price it.
            </p>
          </div>
        </div>

        {/* Bottom Curve Divider */}
        <div className="products-hero__wave">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 720,10 1080,45 C1260,62 1360,20 1440,35 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §02 CATEGORY NAVIGATION BAR WITH ICONS
          Floating white bar with category icon items
      ══════════════════════════════════════════════════════════════════ */}
      <section className="products-cats-section">
        <div className="shell">
          <CategoryBar active={activeCategory} onSelect={selectCategory} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §03 CATALOGUE GRID HEADER & SORTING
          "Showing 30 products" + "Sort by: A-Z"
      ══════════════════════════════════════════════════════════════════ */}
      <section className="products-list-section">
        <div className="shell">
          <div className="products-toolbar">
            <div className="products-toolbar__count">
              {state.status === "ready" ? (
                <>
                  Showing <strong>{sorted.length}</strong> products
                </>
              ) : (
                "Loading catalogue…"
              )}
            </div>

            <div className="products-toolbar__sort">
              <label htmlFor="sort-select" className="products-toolbar__sort-label">
                Sort by:
              </label>
              <div className="products-toolbar__select-wrapper">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="products-toolbar__select"
                >
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
                <svg className="products-toolbar__select-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              §04 4-COLUMN PRODUCT CARDS GRID
              ══════════════════════════════════════════════════════════════════ */}
          <Async state={state} label="the catalogue" rows={8}>
            {() => <ProductGrid items={sorted} onClearCategory={() => selectCategory("")} />}
          </Async>
        </div>
      </section>
    </div>
  );
}
