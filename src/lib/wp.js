/* Client for the TerraPHA WordPress REST API.

   Two constraints shape everything here:

   1. wc/store/v1 sends no Access-Control-Allow-Origin header, so the browser
      blocks it. Products come from wp/v2/product instead, which does send
      CORS headers and carries the same 24 items.

   2. The host has a ~2s latency floor and returns very large payloads by
      default — a product listing with _embed is ~190 KB and took ~8s. So
      listings ask for named fields only and never for content.rendered, and
      the product listing joins media and terms from separate small requests
      rather than paying for _embed across 24 items. Responses are cached for
      the session so going back to a listing is instant. */

export const WP_BASE = import.meta.env.VITE_WP_BASE ?? "https://terrapha.com/wp-json";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const cache = new Map();

async function get(path, params = {}) {
  const url = new URL(`${WP_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  }

  const key = url.toString();
  if (cache.has(key)) return cache.get(key);

  const request = (async () => {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new ApiError(`${res.status} requesting ${path}`, res.status);
    return {
      data: await res.json(),
      total: Number(res.headers.get("X-WP-Total") ?? 0),
      totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 1),
    };
  })();

  // cache the promise so parallel callers share one request
  cache.set(key, request);
  request.catch(() => cache.delete(key));
  return request;
}

/* ---------- shaping ---------- */

const decode = (html = "") => {
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
};

export const stripTags = (html = "") =>
  decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

const embedded = (item, key) => item?._embedded?.[key] ?? [];

/* Originals here are ~1 MB PNGs, so never point a listing at source_url —
   24 product cards would pull 25 MB and paint half-decoded. `small` feeds the
   square product cards, `thumb` the wider blog cards. */
function shapeMedia(media) {
  if (!media?.source_url) return null;
  const sizes = media.media_details?.sizes ?? {};
  const pick = (...names) => names.map((n) => sizes[n]?.source_url).find(Boolean);
  return {
    src: pick("large", "medium_large") ?? media.source_url,
    thumb: pick("medium_large", "medium", "thumbnail") ?? media.source_url,
    small: pick("medium", "thumbnail", "medium_large") ?? media.source_url,
    alt: stripTags(media.alt_text || media.title?.rendered || ""),
  };
}

const featuredImage = (item) => shapeMedia(embedded(item, "wp:featuredmedia")[0]);

function terms(item, taxonomy) {
  return embedded(item, "wp:term")
    .flat()
    .filter((t) => t?.taxonomy === taxonomy)
    .map((t) => ({ id: t.id, name: decode(t.name), slug: t.slug }));
}

const shapePost = (p) => ({
  id: p.id,
  slug: p.slug,
  title: decode(p.title?.rendered ?? ""),
  excerpt: stripTags(p.excerpt?.rendered ?? ""),
  content: p.content?.rendered ?? "",
  date: p.date,
  image: featuredImage(p),
  categories: terms(p, "category"),
});

/* Listings omit content.rendered — it is the single biggest field and no
   listing renders it. */
const LIST_FIELDS = "id,slug,title,excerpt,date,_links,_embedded";

/* ---------- posts ---------- */

export async function fetchPosts({ page = 1, perPage = 9, search, category } = {}) {
  const r = await get("/wp/v2/posts", {
    page,
    per_page: perPage,
    _embed: 1,
    _fields: LIST_FIELDS,
    search,
    categories: category,
  });
  return { items: r.data.map(shapePost), total: r.total, totalPages: r.totalPages };
}

export async function fetchPost(slug) {
  const r = await get("/wp/v2/posts", { slug, _embed: 1 });
  if (!r.data.length) throw new ApiError(`No post named ${slug}`, 404);
  return shapePost(r.data[0]);
}

/* ---------- products ----------
   Joined client-side from three small requests instead of one _embed call:
   ~15 KB in parallel against ~190 KB sequentially. */

export async function fetchProductCategories() {
  const r = await get("/wp/v2/product_cat", {
    per_page: 50,
    _fields: "id,name,slug,count",
  });
  return r.data
    .filter((c) => c.count > 0 && c.slug !== "uncategorized")
    .map((c) => ({ id: c.id, name: decode(c.name), slug: c.slug, count: c.count }));
}

async function fetchMediaByIds(ids) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();

  /* media_details has to be requested whole — WP ignores _fields paths below
     it, so `media_details.sizes` comes back empty. ~127 KB once per session,
     against the 25 MB of full-size images it saves. */
  const r = await get("/wp/v2/media", {
    include: unique.join(","),
    per_page: Math.min(unique.length, 100),
    _fields: "id,alt_text,source_url,media_details",
  });
  return new Map(r.data.map((m) => [m.id, shapeMedia(m)]));
}

/* Text first. The media lookup needs the product IDs, so it can only run once
   the listing has returned, and on this host that is another ~2.5s. Rather
   than hold the whole grid back, the cards render immediately and
   fetchProductMedia fills the images in behind them. */
export async function fetchProducts({ page = 1, perPage = 24, category } = {}) {
  const catsPromise = fetchProductCategories();
  const catId = category
    ? (await catsPromise).find((c) => c.slug === category)?.id
    : undefined;

  /* The bar carries categories that exist as a plan before they exist in
     wp-admin. Their slug resolves to no term, and an undefined product_cat
     is dropped from the query — which would answer "cosmetics" with the
     whole catalogue. Answer with nothing instead, so the grid shows its
     empty state until the category is really populated. */
  if (category && catId === undefined) {
    return { items: [], total: 0, totalPages: 0 };
  }

  const r = await get("/wp/v2/product", {
    page,
    per_page: perPage,
    _fields: "id,slug,title,excerpt,featured_media,product_cat",
    product_cat: catId,
  });

  const cats = await catsPromise;
  const byId = new Map(cats.map((c) => [c.id, c]));

  const items = r.data.map((p) => ({
    id: p.id,
    slug: p.slug,
    mediaId: p.featured_media,
    title: decode(p.title?.rendered ?? ""),
    excerpt: stripTags(p.excerpt?.rendered ?? ""),
    categories: (p.product_cat ?? []).map((id) => byId.get(id)).filter(Boolean),
  }));

  return { items, total: r.total, totalPages: r.totalPages };
}

export function fetchProductMedia(ids) {
  return fetchMediaByIds(ids);
}

export async function fetchProduct(slug) {
  const r = await get("/wp/v2/product", { slug, _embed: 1 });
  if (!r.data.length) throw new ApiError(`No product named ${slug}`, 404);
  const p = r.data[0];
  return {
    id: p.id,
    slug: p.slug,
    title: decode(p.title?.rendered ?? ""),
    excerpt: stripTags(p.excerpt?.rendered ?? ""),
    content: p.content?.rendered ?? "",
    image: featuredImage(p),
    categories: terms(p, "product_cat"),
  };
}

export async function fetchPostCategories() {
  const r = await get("/wp/v2/categories", {
    per_page: 50,
    _fields: "id,name,slug,count",
  });
  return r.data
    .filter((c) => c.count > 0)
    .map((c) => ({ id: c.id, name: decode(c.name), slug: c.slug, count: c.count }));
}
