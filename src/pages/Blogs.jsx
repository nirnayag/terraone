import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchPosts } from "../lib/wp";
import { formatDate } from "../lib/sanitise";
import { useResource } from "../hooks/useResource";
import Async from "../components/Async";
import { useEffect } from "react";
import "./Blogs.css";

const PER_PAGE = 9;

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

export default function Blogs() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const search = params.get("q") ?? "";
  const [sortBy, setSortBy] = useState("latest");
  const [emailVal, setEmailVal] = useState("");

  useEffect(() => {
    document.title = "Writing on biopolymers — TerraOne";
  }, []);

  const state = useResource(
    () => fetchPosts({ page, perPage: PER_PAGE, search }),
    [page, search]
  );

  const setPage = (next) => {
    const p = new URLSearchParams(params);
    if (next > 1) p.set("page", next);
    else p.delete("page");
    setParams(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    setParams(p);
  };

  return (
    <div className="blogs-page">

      {/* ═══════════════════════════════════════════════════════════
          HERO — full-bleed background image
      ═══════════════════════════════════════════════════════════ */}
      <section className="blogs-hero">
        {/* overlay */}
        <div className="blogs-hero__overlay" aria-hidden="true" />

        <div className="shell blogs-hero__shell">
          <p className="blogs-hero__eyebrow">
            <span className="blogs-hero__eyebrow-dot" aria-hidden="true" />
            INSIGHTS
          </p>

          <h1 className="blogs-hero__title">
            Writing on<br />biopolymers
          </h1>

          <p className="blogs-hero__lede">
            Research notes, compliance explainers and sector analysis<br />
            from the people making the material.
          </p>

          {/* Search */}
          <form className="blogs-search" role="search" onSubmit={onSearch}>
            <label className="visually-hidden" htmlFor="blog-q">
              Search posts
            </label>
            <input
              id="blog-q"
              name="q"
              type="search"
              className="blogs-search__field"
              placeholder="Search posts"
              defaultValue={search}
            />
            <button className="blogs-search__btn" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* bottom wave */}
        <div className="blogs-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none">
            <path
              d="M0,32 C300,72 600,8 900,38 C1100,58 1300,18 1440,30 L1440,72 L0,72 Z"
              fill="#f5f7f4"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          POSTS GRID
      ═══════════════════════════════════════════════════════════ */}
      <section className="blogs-list">
        <div className="shell">
          <Async
            state={state}
            label="posts"
            rows={6}
            empty={
              <>
                <p className="async__title">Nothing matched "{search}"</p>
                <p className="async__body">
                  Try a broader term, or browse everything from the start.
                </p>
                <button
                  className="blogs-empty-btn"
                  onClick={() => setParams(new URLSearchParams())}
                >
                  Show all posts
                </button>
              </>
            }
          >
            {({ items, total, totalPages }) => (
              <>
                {/* Toolbar */}
                <div className="blogs-toolbar">
                  <p className="blogs-toolbar__count">
                    <span className="blogs-toolbar__count-icon" aria-hidden="true">⊞</span>
                    <strong>{total}</strong> {search ? `result${total === 1 ? "" : "s"} for "${search}"` : "posts"}
                  </p>
                  <div className="blogs-toolbar__sort">
                    <span className="blogs-toolbar__sort-label">Sort by:</span>
                    <div className="blogs-toolbar__select-wrap">
                      <select
                        className="blogs-toolbar__select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        {SORT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <svg className="blogs-toolbar__select-arrow" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Cards grid */}
                <ul className="blogs-grid">
                  {items.map((post) => (
                    <li className="blog-card" key={post.id}>
                      <Link className="blog-card__link" to={`/blogs/${post.slug}`}>
                        {/* Image — edge to edge */}
                        <div className="blog-card__img-wrap">
                          {(() => {
                            const cardImg =
                              typeof post.image === "object"
                                ? post.image?.thumb || post.image?.src
                                : post.image || "/media/sectors/packaging.jpg";
                            return (
                              <img
                                className="blog-card__img"
                                src={cardImg}
                                alt={post.title || ""}
                                loading="lazy"
                              />
                            );
                          })()}
                        </div>

                        {/* Body */}
                        <div className="blog-card__body">
                          <div className="blog-card__meta">
                            {post.categories[0] && (
                              <span className="blog-card__tag">{post.categories[0].name}</span>
                            )}
                            <time className="blog-card__date" dateTime={post.date}>
                              {formatDate(post.date)}
                            </time>
                          </div>

                          <h2 className="blog-card__title">{post.title}</h2>
                          <p className="blog-card__excerpt">{post.excerpt}</p>

                          <span className="blog-card__read-more">
                            Read more <span className="blog-card__arrow">→</span>
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="blogs-pager" aria-label="Pagination">
                    <button
                      className="blogs-pager__btn"
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                    >
                      ← Previous
                    </button>
                    <div className="blogs-pager__pages">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const p = i + 1;
                        return (
                          <button
                            key={p}
                            className={`blogs-pager__page${page === p ? " is-active" : ""}`}
                            onClick={() => setPage(p)}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      className="blogs-pager__btn"
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                    >
                      Next →
                    </button>
                  </nav>
                )}
              </>
            )}
          </Async>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STAY UPDATED — newsletter strip
      ═══════════════════════════════════════════════════════════ */}
      <section className="blogs-newsletter">
        <div className="shell blogs-newsletter__inner">
          <div className="blogs-newsletter__left">
            <div className="blogs-newsletter__icon" aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="rgba(109,190,69,0.12)" />
                <path d="M8 14a2 2 0 012-2h20a2 2 0 012 2v14a2 2 0 01-2 2H10a2 2 0 01-2-2V14z" stroke="#6DBE45" strokeWidth="1.8" fill="none"/>
                <path d="M8 14l12 9 12-9" stroke="#6DBE45" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div>
              <p className="blogs-newsletter__heading">Stay updated</p>
              <p className="blogs-newsletter__sub">
                Get the latest insights on biopolymers and industry updates.
              </p>
            </div>
          </div>

          <form
            className="blogs-newsletter__form"
            onSubmit={(e) => { e.preventDefault(); setEmailVal(""); }}
          >
            <input
              type="email"
              className="blogs-newsletter__email"
              placeholder="Your email address"
              value={emailVal}
              onChange={(e) => setEmailVal(e.target.value)}
              required
            />
            <button className="blogs-newsletter__submit" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        {/* decorative leaf */}
        <img
          className="blogs-newsletter__deco"
          src="/media/decor/blog_hero_bg.png"
          alt=""
          aria-hidden="true"
        />
      </section>
    </div>
  );
}
