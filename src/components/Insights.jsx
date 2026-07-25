import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/wp";
import { formatDate } from "../lib/sanitise";
import { useResource } from "../hooks/useResource";
import { useReveal } from "../hooks/useReveal";
import Async from "./Async";
import "./Insights.css";

export default function Insights() {
  const scope = useReveal();
  const state = useResource(() => fetchPosts({ perPage: 3 }), []);

  return (
    <section className="band band--tight insights" ref={scope}>
      <div className="shell">
        <div className="head head--split insights__head reveal">
          <div>
            <p className="eyebrow">Insights</p>
            <h2 className="display display--lg insights__heading">From the lab and the field</h2>
          </div>
          <Link className="textlink insights__more" to="/blogs">
            All writing <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Async state={state} label="the latest posts" rows={3}>
          {({ items }) => (
            <ul className="insights__grid">
              {items.map((post, i) => (
                <li className="post reveal is-in" key={post.id} style={{ transitionDelay: `${i * 80}ms` }}>
                  <Link className="post__link" to={`/blogs/${post.slug}`}>
                    <p className="post__meta">
                      {post.categories[0] && <span className="post__tag">{post.categories[0].name}</span>}
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                    <h3 className="post__title">{post.title}</h3>
                    <span className="post__go" aria-hidden="true">
                      Read →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Async>
      </div>
    </section>
  );
}
