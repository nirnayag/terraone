import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/wp";
import { formatDate } from "../lib/sanitise";
import { useResource } from "../hooks/useResource";
import { useReveal } from "../hooks/useReveal";
import Async from "./Async";
import "./Insights.css";

const FALLBACK_IMAGES = [
  "/media/sectors/aquaculture.jpg",
  "/media/sectors/packaging.jpg",
  "/media/sectors/agriculture.jpg",
  "/media/sectors/biomedical.jpg",
  "/media/sectors/pharmaceutical.jpg",
  "/media/sectors/wastewater.jpg",
];

export default function Insights() {
  const scope = useReveal();
  const state = useResource(() => fetchPosts({ perPage: 3 }), []);

  return (
    <section className="insights" ref={scope}>
      <span className="insights__dots insights__dots--top" aria-hidden="true" />
      <span className="insights__dots insights__dots--right" aria-hidden="true" />
      <span className="insights__orb" aria-hidden="true" />
      <span className="insights__leaf insights__leaf--one" aria-hidden="true" />
      <span className="insights__leaf insights__leaf--two" aria-hidden="true" />
      <span className="insights__ground" aria-hidden="true" />
      {/* ambient floating particles */}
      <span className="insights__particle insights__particle--a" aria-hidden="true" />
      <span className="insights__particle insights__particle--b" aria-hidden="true" />
      <span className="insights__particle insights__particle--c" aria-hidden="true" />
      <span className="insights__particle insights__particle--d" aria-hidden="true" />
      <span className="insights__particle insights__particle--e" aria-hidden="true" />
      <span className="insights__particle insights__particle--f" aria-hidden="true" />

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

          <Link className="insights__more insights__more--top" to="/blogs">
            More Blogs <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="insights__stage">
          <Async state={state} label="the latest posts" rows={4}>
            {({ items }) => (
              <ul className="insights__rail">
                {items.map((post, i) => {
                  const image = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

                  return (
                    <li
                      className="blogcard"
                      key={post.id}
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <Link className="blogcard__link" to={`/blogs/${post.slug}`}>
                        <figure className="blogcard__media">
                          <img src={image} alt="" loading="lazy" />

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
            )}
          </Async>
        </div>

        <div className="insights__foot">
          <Link className="insights__more insights__more--bottom" to="/blogs">
            View All Blogs <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
