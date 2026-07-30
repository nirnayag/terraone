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

/* A product can carry terms outside the list. Label it with the first
   term that is on the list, and with nothing at all if none is — never
   with a name the category bar does not offer. */
export function categoryLabel(categories = []) {
  for (const c of categories) {
    const slug = canonical(c?.slug);
    if (slug) return NAME_BY_SLUG.get(slug);
  }
  return "";
}

/* Same rule for a local catalogue entry, which carries a bare slug on
   `category` rather than a list of terms. */
export function localCategoryLabel(product) {
  return product ? categoryLabel([{ slug: product.category }]) : "";
}
