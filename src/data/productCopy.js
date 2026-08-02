/* ══════════════════════════════════════════════════════════════════
   PRODUCT COPY OVERRIDES

   Approved wording for specific products, overriding what the post
   currently holds in WordPress. Only the slugs listed here are
   affected — every other product renders straight from the API.

   This exists because the site has no write access to the CMS, so
   copy approved after the last content load cannot be pushed back
   upstream. It is a stopgap, not the intended home for this text:
   once a line is entered in wp-admin, delete it here so the CMS is
   the single source of truth again.

   `title`    replaces the product name.
   `excerpt`  replaces the card and detail summary.
   ══════════════════════════════════════════════════════════════════ */
const COPY = {
  "carry-bags": {
    excerpt:
      "Designed to meet the demands of everyday retail, grocery, and high-volume takeaway use, they perform without compromise and biodegrade naturally in soil and water within 100 to 180 days, delivering the strength, load-bearing reliability, and structural integrity of conventional plastic. For companies who value eco-friendly packaging with better performance, we can deliver on both counts.",
  },

  "grocery-bag": {
    excerpt:
      "Designed to meet the demands of everyday retail, grocery, and high-volume takeaway use, they perform without compromise and biodegrade naturally in soil and water within 100 to 180 days, delivering the strength, load-bearing reliability, and structural integrity of conventional plastic.",
  },

  "cutlery-single-use": {
    excerpt:
      "Single-use cutlery and serviceware range is manufactured from PHA biopolymer, providing the strength and heat resistance necessary for food service applications across both hot and cold formats. Each item including spoons, forks, plates, bowls, bottles, and straws are designed to perform on par with conventional plastic alternatives while biodegrading completely in natural environments within 100 to 180 days.",
  },

  "food-packaging": {
    excerpt:
      "The food packaging range comprises all types of single-use plastics used to package food products, including trays, containers, pouches, wraps, and others, using PHA biopolymer in their composition to perform as safe and eco-friendly materials for food products packaging. Each format maintains the functional properties demanded by food manufacturers and retailers, including moisture resistance, structural integrity, and compatibility with standard packaging equipment.",
  },

  "food-wrap-sheet": {
    excerpt:
      "Food wrapping sheets offer a clean, flexible material for food storage and protection. They are free from the petrochemical content of conventional cling films. Certified safe for direct food contact, they resist moisture and maintain food integrity without leaching harmful compounds. Moreover, these sheets degrade naturally at the end of their lives, making them environmentally friendly to dispose of.",
  },

  "mulching-film": {
    excerpt:
      "Mulching film provides agronomic benefits in terms of water retention, weed control, and soil temperature management, while breaking down naturally after season-end in the field. No collection, no disposal expenses, and no plastic waste in the farm land.",
  },

  "primary-packaging-material": {
    excerpt:
      "Primary packaging serves not only to protect the product but also influences consumer perception. PHA-based materials fulfill both these roles effectively by combining functional performance with sustainability. Available in the form of films, pouches, and flexible wraps suitable for direct product contact, these materials are non-toxic, chemically stable, and fully biodegradable under suitable natural environmental conditions.",
  },

  /* Renamed. The slug stays `human-essentials` — it is the WordPress
     post name and the product's URL, and changing it would break any
     link already shared. */
  "human-essentials": {
    title: "Daily Essentials",
    excerpt:
      "PHA-based daily essentials including razor housings, cosmetic packaging, and brush handles are engineered to meet the aesthetic and durability standards of the personal care industry while eliminating the long-term environmental liability of petroleum-based plastic. Serving its purpose and leaving no trace behind once discarded.",
  },
};

/* Applies any override to a product, leaving untouched ones as they are. */
export const withCopy = (product) =>
  product && COPY[product.slug] ? { ...product, ...COPY[product.slug] } : product;
