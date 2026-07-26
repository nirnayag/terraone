import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/wp";
import { formatDate } from "../lib/sanitise";
import { useResource } from "../hooks/useResource";
import { useReveal } from "../hooks/useReveal";
import Async from "./Async";
import { SectorIcon } from "./SectorIcons";
import "./Insights.css";

const FALLBACK_IMAGES = [
  "/media/sectors/aquaculture.jpg",
  "/media/sectors/packaging.jpg",
  "/media/sectors/agriculture.jpg",
  "/media/sectors/biomedical.jpg",
  "/media/sectors/pharmaceutical.jpg",
  "/media/sectors/wastewater.jpg",
];

const CARD_ICONS = ["aquaculture", "packaging", "agriculture", "pharmaceutical"];

export default function Insights() {
  const scope = useReveal();
  const railRef = useRef(null);
  const state = useResource(() => fetchPosts({ perPage: 6 }), []);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const measurePages = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const card = el.querySelector(".blogcard")?.clientWidth || el.clientWidth || 1;
    const pages = Math.max(1, Math.ceil(el.scrollWidth / Math.max(card, el.clientWidth)));
    setPageCount(pages);
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1)));
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return undefined;
    measurePages();
    el.addEventListener("scroll", measurePages, { passive: true });
    window.addEventListener("resize", measurePages);
    return () => {
      el.removeEventListener("scroll", measurePages);
      window.removeEventListener("resize", measurePages);
    };
  }, [measurePages, state.data?.items?.length]);

  const nudge = (direction) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector(".blogcard")?.clientWidth ?? 360;
    el.scrollBy({ left: direction * (card + 24), behavior: "smooth" });
  };

  const goTo = (index) => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max / Math.max(1, pageCount - 1)) * index, behavior: "smooth" });
  };

  const iconFor = (index) => CARD_ICONS[index % CARD_ICONS.length];

  return (
    <section className="insights" ref={scope}>
      <span className="insights__dots insights__dots--top" aria-hidden="true" />
      <span className="insights__dots insights__dots--right" aria-hidden="true" />
      <span className="insights__orb" aria-hidden="true" />
      <span className="insights__leaf insights__leaf--one" aria-hidden="true" />
      <span className="insights__leaf insights__leaf--two" aria-hidden="true" />
      <span className="insights__ground" aria-hidden="true" />

      <div className="shell insights__shell">
        <div className="insights__head reveal">
          <div className="insights__intro">
            <p className="insights__eyebrow">
              Insights <span aria-hidden="true" />
            </p>
            <h2 className="display display--lg insights__heading">
              Latest Blogs <span aria-hidden="true" />
            </h2>
            <p className="insights__sub">
              Deep dives on bioproducts, innovations, and a greener tomorrow.
            </p>
            <span className="insights__rule" aria-hidden="true" />
          </div>

          <Link className="insights__more" to="/blogs">
            More Blogs <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="insights__stage">
          <button
            className="insights__arrow insights__arrow--prev"
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous blog posts"
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>

          <Async state={state} label="the latest posts" rows={4}>
            {({ items }) => (
              <>
                <ul className="insights__rail" ref={railRef}>
                  {items.map((post, i) => {
                    const image = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

                    return (
                      <li
                        className={`blogcard${i === 1 ? " is-featured" : ""}`}
                        key={post.id}
                        style={{ transitionDelay: `${i * 80}ms` }}
                      >
                        <Link className="blogcard__link" to={`/blogs/${post.slug}`}>
                          <figure className="blogcard__media">
                            <img src={image} alt="" loading="lazy" />

                            <span className="blogcard__icon" aria-hidden="true">
                              <SectorIcon slug={iconFor(i)} />
                            </span>

                            {i === 1 && (
                              <>
                                <span className="blogcard__featured">Featured</span>
                                <span className="blogcard__spark" aria-hidden="true">
                                  *
                                </span>
                              </>
                            )}
                          </figure>

                          <div className="blogcard__body">
                            <p className="blogcard__tag">
                              {post.categories[0]?.name ?? "TerraPHA"}
                            </p>
                            <h3 className="blogcard__title">{post.title}</h3>
                            <div className="blogcard__foot">
                              <time dateTime={post.date}>{formatDate(post.date)}</time>
                              <span aria-hidden="true">Read more &rarr;</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <ul className="insights__pager" aria-label="Blog carousel pages">
                  {Array.from({ length: pageCount }, (_, i) => (
                    <li key={i}>
                      <button
                        className={i === page ? "is-on" : ""}
                        onClick={() => goTo(i)}
                        aria-label={`Show blog group ${i + 1} of ${pageCount}`}
                        aria-current={i === page || undefined}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Async>

          <button
            className="insights__arrow insights__arrow--next"
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next blog posts"
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>

    
      </div>
    </section>
  );
}
