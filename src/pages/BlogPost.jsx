import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPost, fetchPosts } from "../lib/wp";
import { findBlogPostBySlug, BLOG_POSTS_DATA } from "../data/blogs";
import { sanitiseHtml, formatDate, readingTime } from "../lib/sanitise";
import "./BlogPost.css";

/* ── FAQ Accordion Component ─────────────────────────────────────── */
function FaqAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  if (!items || !items.length) return null;

  return (
    <div className="bp-faq-card">
      <h3 className="bp-faq-card__title">Frequently Asked Questions</h3>
      <div className="bp-faq-list">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`bp-faq-item ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="bp-faq-btn"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span className="bp-faq-question">{item.q}</span>
                <span className="bp-faq-chevron">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="bp-faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Keep Reading Section ───────────────────────────────────────── */
function KeepReading({ currentSlug }) {
  // Use local blog list for consistent rich titles & dates
  const posts = BLOG_POSTS_DATA.filter((p) => p.slug !== currentSlug).slice(0, 3);

  return (
    <aside className="bp-keep-reading">
      <h2 className="bp-keep-reading__title">Keep reading</h2>
      <div className="bp-keep-reading__box">
        {posts.map((p) => (
          <Link key={p.id} className="bp-kr-row" to={`/blogs/${p.slug}`}>
            <span className="bp-kr-date">{p.displayDate || formatDate(p.date)}</span>
            <span className="bp-kr-title">{p.title}</span>
            <span className="bp-kr-arrow">→</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* ── Main BlogPost Component ─────────────────────────────────────── */
export default function BlogPost() {
  const { slug } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 1. Try fetching from WP API
    fetchPost(slug)
      .then((wpPost) => {
        const local = findBlogPostBySlug(slug);
        setPostData({
          ...local,
          ...wpPost,
          displayDate: formatDate(wpPost.date),
          readTime: `${readingTime(wpPost.content)} min read`,
        });
        setLoading(false);
      })
      .catch(() => {
        // 2. Fall back to rich local data
        const local = findBlogPostBySlug(slug);
        setPostData(local);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (postData) {
      document.title = `${postData.title} — TerraOne`;
    }
  }, [postData]);

  if (loading) {
    return (
      <div className="bp-page">
        <div className="shell">
          <div className="bp-loading">
            <div className="bp-loading__spinner" />
            <p>Loading insight...</p>
          </div>
        </div>
      </div>
    );
  }

  const p = postData || findBlogPostBySlug(slug);

  return (
    <div className="bp-page">
      <div className="shell">
        {/* Top Back Link */}
        <Link className="bp-back" to="/blogs">
          <span aria-hidden="true">←</span> All insights
        </Link>

        <article className="bp-article">
          {/* Header Section */}
          <header className="bp-header">
            <div className="bp-header__meta">
              <span className="bp-header__tag">{p.category || "INSIGHTS"}</span>
              <span className="bp-header__date">{p.displayDate || formatDate(p.date)}</span>
              <span className="bp-header__dot">•</span>
              <span className="bp-header__readtime">{p.readTime || "5 min read"}</span>
            </div>

            <h1 className="bp-header__title">{p.title}</h1>

            {p.excerpt && <p className="bp-header__lede">{p.excerpt}</p>}
          </header>

          {/* Hero Featured Image */}
          {(() => {
            const imgSrc =
              typeof p.image === "object"
                ? p.image?.src || p.image?.thumb
                : p.image || "/media/sectors/animal-husbandry.jpg";
            return (
              <div className="bp-hero-img-wrap">
                <img
                  className="bp-hero-img"
                  src={imgSrc}
                  alt={p.title}
                />
              </div>
            );
          })()}

          {/* Article Main Body Content */}
          <div className="bp-main-content">
            {/* Direct HTML Content */}
            {p.content ? (
              <div
                className="bp-prose"
                dangerouslySetInnerHTML={{ __html: sanitiseHtml(p.content) }}
              />
            ) : null}

            {/* Comparison Box (Problem vs Solution) */}
            {p.comparison && (
              <div className="bp-comparison-card">
                <div className="bp-comp-header">
                  <div className="bp-comp-head bp-comp-head--problem">
                    <span className="bp-comp-icon">✖</span>
                    <span>{p.comparison.leftHeader}</span>
                  </div>
                  <div className="bp-comp-head bp-comp-head--solution">
                    <span className="bp-comp-icon">✔</span>
                    <span>{p.comparison.rightHeader}</span>
                  </div>
                </div>

                <div className="bp-comp-body">
                  {p.comparison.rows.map((row, idx) => (
                    <div key={idx} className="bp-comp-row">
                      <div className="bp-comp-cell bp-comp-cell--problem">
                        <span className="bp-cell-icon">✖</span>
                        <span>{row.problem}</span>
                      </div>
                      <div className="bp-comp-cell bp-comp-cell--solution">
                        <span className="bp-cell-icon">✔</span>
                        <span>{row.solution}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2-Column Section: How TerraOne Helps & References (Left) vs FAQs (Right) */}
            <div className="bp-two-col">
              {/* Left Column */}
              <div className="bp-col-left">
                {p.howHelps && p.howHelps.length > 0 && (
                  <div className="bp-section">
                    <h2 className="bp-section__title">How TerraOne helps</h2>
                    {p.howHelps.map((para, idx) => (
                      <p key={idx} className="bp-section__para">{para}</p>
                    ))}
                  </div>
                )}

                {/* References */}
                {p.references && p.references.length > 0 && (
                  <div className="bp-references">
                    <h3 className="bp-references__title">References</h3>
                    <ol className="bp-references__list">
                      {p.references.map((ref) => (
                        <li key={ref.id} className="bp-ref-item">
                          <span>{ref.text} </span>
                          <a href={ref.url} className="bp-ref-link">{ref.journal}</a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Right Column: FAQs Accordion */}
              <div className="bp-col-right">
                <FaqAccordion items={p.faqs} />
              </div>
            </div>
          </div>

          {/* Bottom Keep Reading Section */}
          <KeepReading currentSlug={p.slug} />
        </article>
      </div>
    </div>
  );
}
