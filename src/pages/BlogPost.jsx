import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPost, fetchPosts } from "../lib/wp";
import { sanitiseHtml, formatDate, readingTime } from "../lib/sanitise";
import { useResource } from "../hooks/useResource";
import Async from "../components/Async";
import "./BlogPost.css";

function Related({ excludeId }) {
  const state = useResource(() => fetchPosts({ perPage: 4 }), []);
  if (state.status !== "ready") return null;

  const items = state.data.items.filter((p) => p.id !== excludeId).slice(0, 3);
  if (!items.length) return null;

  return (
    <aside className="related">
      <h2 className="related__title display display--md">Keep reading</h2>
      <ul className="related__list">
        {items.map((p) => (
          <li key={p.id}>
            <Link to={`/blogs/${p.slug}`}>
              <time className="related__date" dateTime={p.date}>
                {formatDate(p.date)}
              </time>
              <span className="related__name">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const state = useResource(() => fetchPost(slug), [slug]);

  useEffect(() => {
    if (state.status === "ready") document.title = `${state.data.title} — TerraOne`;
  }, [state]);

  return (
    <article className="band band--tight article">
      <div className="shell">
        <Link className="textlink article__back" to="/blogs">
          <span aria-hidden="true">←</span> All writing
        </Link>

        <Async state={state} label="this post" rows={5}>
          {(post) => (
            <>
              <header className="article__head">
                <p className="article__meta">
                  {post.categories[0] && (
                    <span className="article__tag">{post.categories[0].name}</span>
                  )}
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{readingTime(post.content)} min read</span>
                </p>
                <h1 className="display display--lg article__title">{post.title}</h1>
              </header>

              {post.image && (
                <img className="article__hero" src={post.image.src} alt={post.image.alt} />
              )}

              {/* Elementor's inline styles and classes are stripped before this
                  renders, so imported markup can't introduce off-palette colour. */}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: sanitiseHtml(post.content) }}
              />

              <Related excludeId={post.id} />
            </>
          )}
        </Async>
      </div>
    </article>
  );
}
