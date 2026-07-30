/* ══════════════════════════════════════════════════════════════════
   PRODUCT CATEGORIES — the closed set of application areas, in the
   order they should read.

   This is the whole vocabulary the product pages speak. The category
   bar shows these and only these, and the names are exactly these, so
   a term renamed in wp-admin cannot change the wording on the site and
   a term added there cannot introduce a name off this list. Terms that
   exist in WordPress but not here (SR30) still filter and still return
   their products; they are simply never named on the page.
   ══════════════════════════════════════════════════════════════════ */
export const PRODUCT_CATEGORIES = [
  { slug: "packaging", name: "Packaging" },
  { slug: "agriculture-horticulture", name: "Agriculture and Horticulture" },
  { slug: "animal-husbandry", name: "Animal husbandry" },
  { slug: "aquaculture-fisheries", name: "Aquaculture" },
  { slug: "biomedical-healthcare", name: "Biomedical and healthcare" },
  { slug: "waste-water", name: "Waste water" },
  { slug: "cosmetics", name: "Cosmetics" },
  { slug: "personal-care", name: "Personal care" },
  { slug: "textile", name: "Textile" },
  { slug: "food-beverage", name: "Food and beverage" },
];

const NAME_BY_SLUG = new Map(PRODUCT_CATEGORIES.map((c) => [c.slug, c.name]));

/* The local catalogue in ./products.js predates this list and carries its
   own slugs. These are the ones that map onto it without a judgement call.
   Deliberately absent: "biodegradable-inputs" and "horeca-utensils", which
   span more than one entry above — those products go unlabelled until the
   right category is assigned rather than being filed by guess. */
const LEGACY_SLUGS = {
  agriculture: "agriculture-horticulture",
  "animal-nutrition": "animal-husbandry",
  aquaculture: "aquaculture-fisheries",
  "food-service": "food-beverage",
};

const canonical = (slug) => (NAME_BY_SLUG.has(slug) ? slug : LEGACY_SLUGS[slug]);

/* ── OVERRIDES ────────────────────────────────────────────────────
   Where a product belongs on this site, when that differs from the
   terms currently set on it in WordPress. Keyed by product slug; the
   listed categories replace the WP ones outright, for both the label
   and the filter.

   TerraPURO-NP is set in WP to Animal Husbandry and Aquaculture. It
   is a waste water product and must not read as animal husbandry —
   and "waste-water" does not exist as a term in wp-admin yet, so the
   correction cannot be made there.

   Each entry is a divergence from the CMS, so it is worth clearing:
   once wp-admin holds the right terms, delete the line.
   ────────────────────────────────────────────────────────────────── */
const OVERRIDES = {
  "terrapuro-np": ["waste-water"],
};

/* Every category a product belongs to, canonical and on-list. */
export function categorySlugsFor(product) {
  const override = OVERRIDES[product?.slug];
  if (override) return override;

  const fromTerms = (product?.categories ?? []).map((c) => canonical(c?.slug));
  const fromLocal = canonical(product?.category);
  return [...new Set([...fromTerms, fromLocal].filter(Boolean))];
}

export const isInCategory = (product, slug) =>
  !slug || categorySlugsFor(product).includes(slug);

/* Products carry terms outside the list, and can end up on none of it.
   Label with the first category that is on the list, and with nothing
   at all otherwise — never with a name the category bar does not offer. */
export function categoryLabel(product) {
  const [first] = categorySlugsFor(product);
  return first ? NAME_BY_SLUG.get(first) : "";
}
