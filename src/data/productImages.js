/* ══════════════════════════════════════════════════════════════════
   LOCAL PRODUCT IMAGES

   Art supplied for specific products, which takes precedence over the
   featured image on the WordPress post. Only the slugs listed here are
   affected — every other product still renders whatever the API sends,
   so this file is an exception list, not a replacement for the CMS.

   Keyed by product slug and stored under the same name in
   public/media/products, so the mapping is checkable by eye. To hand a
   product back to WordPress, delete its line and its file.
   ══════════════════════════════════════════════════════════════════ */
const LOCAL_IMAGES = [
  "grocery-bag",
  "carry-bags",
  "food-packaging",
  "food-wrap-sheet",
  "cutlery-single-use",
  "mulching-film",
  "primary-packaging-material",
  "human-essentials",
  "compostable-bag",
];

const BY_SLUG = new Map(LOCAL_IMAGES.map((slug) => [slug, `/media/products/${slug}.jpg`]));

/* The supplied image for a product, or undefined to fall back to the API. */
export const localProductImage = (slug) => BY_SLUG.get(slug);
