import { useLocation, Navigate } from "react-router-dom";
import { fetchPost } from "../lib/wp";
import { useResource } from "../hooks/useResource";
import NotFound from "./NotFound";

/* The existing WordPress site publishes posts at the site root —
   terrapha.com/some-post-slug/ — with no /blogs prefix. If this app replaces
   it, every one of those indexed URLs would land on a 404.

   So before showing the 404, an unmatched single-segment path is checked
   against the post slugs; a hit forwards to the article.

   This is a safety net for people following old links, not an SEO fix. Search
   engines need real 301s at the host — a client-side redirect passes no
   ranking signal. */
export default function LegacyRedirect() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const looksLikeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(slug);

  const state = useResource(
    () => (looksLikeSlug ? fetchPost(slug).catch(() => null) : Promise.resolve(null)),
    [slug, looksLikeSlug],
  );

  if (state.status === "loading" && looksLikeSlug) {
    return (
      <section className="band band--tight">
        <div className="shell">
          <p className="datum" role="status">
            Checking that link…
          </p>
        </div>
      </section>
    );
  }

  if (state.data) return <Navigate to={`/blogs/${slug}`} replace />;

  return <NotFound />;
}
