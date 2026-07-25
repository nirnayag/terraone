import { useSearchParams, Link } from "react-router-dom";
import { fetchPosts } from "../lib/wp";
import { formatDate } from "../lib/sanitise";
import { useResource } from "../hooks/useResource";
import Async from "../components/Async";
import PageHead from "../components/PageHead";
import "./Blogs.css";

const PER_PAGE = 9;

export default function Blogs() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page") ?? 1));
  const search = params.get("q") ?? "";

  const state = useResource(() => fetchPosts({ page, perPage: PER_PAGE, search }), [page, search]);

  const setPage = (next) => {
    const p = new URLSearchParams(params);
    if (next > 1) p.set("page", next);
    else p.delete("page");
    setParams(p);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    setParams(p);
  };

  return (
    <>
      <PageHead
        eyebrow="Insights"
        title="Writing on biopolymers"
        lede="Research notes, compliance explainers and sector analysis from the people making the material."
      >
        <form className="blogsearch" role="search" onSubmit={onSearch}>
          <label className="visually-hidden" htmlFor="blog-q">
            Search posts
          </label>
          <input
            id="blog-q"
            name="q"
            type="search"
            className="blogsearch__field"
            placeholder="Search posts"
            defaultValue={search}
          />
          <button className="blogsearch__submit" type="submit">
            Search
          </button>
        </form>
      </PageHead>

      <section className="band band--tight">
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
                <button className="btn btn--fill" onClick={() => setParams(new URLSearchParams())}>
                  Show all posts
                </button>
              </>
            }
          >
            {({ items, total, totalPages }) => (
              <>
                <p className="blogs__count datum">
                  {search ? `${total} result${total === 1 ? "" : "s"} for "${search}"` : `${total} posts`}
                </p>

                <ul className="blogs__grid">
                  {items.map((post) => (
                    <li className="entry" key={post.id}>
                      <Link className="entry__link" to={`/blogs/${post.slug}`}>
                        {post.image ? (
                          <img
                            className="entry__img"
                            src={post.image.thumb}
                            alt=""
                            loading="lazy"
                          />
                        ) : (
                          <span className="entry__img entry__img--none" aria-hidden="true" />
                        )}
                        <div className="entry__body">
                          <p className="entry__meta">
                            {post.categories[0] && (
                              <span className="entry__tag">{post.categories[0].name}</span>
                            )}
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                          </p>
                          <h2 className="entry__title">{post.title}</h2>
                          <p className="entry__excerpt">{post.excerpt}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {totalPages > 1 && (
                  <nav className="pager" aria-label="Pagination">
                    <button
                      className="pager__btn"
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                    >
                      ← Newer
                    </button>
                    <p className="pager__count">
                      Page {page} of {totalPages}
                    </p>
                    <button
                      className="pager__btn"
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                    >
                      Older →
                    </button>
                  </nav>
                )}
              </>
            )}
          </Async>
        </div>
      </section>
    </>
  );
}
