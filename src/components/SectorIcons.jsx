/* One mark per sector. Stroke-only, drawn in currentColor so they inherit
   whatever palette colour the surrounding card sets — no fills, no colour of
   their own. */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Packaging = () => (
  <svg {...base}>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
    <path d="M3 7.5 12 12l9-4.5M12 12v9" />
  </svg>
);

const Agriculture = () => (
  <svg {...base}>
    <path d="M12 21v-8" />
    <path d="M12 13c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z" />
    <path d="M12 16c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5z" />
  </svg>
);

const Aquaculture = () => (
  <svg {...base}>
    <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <path d="M12 3v6M9 6l3-3 3 3" />
  </svg>
);

const AnimalHusbandry = () => (
  <svg {...base}>
    <circle cx="12" cy="14" r="5" />
    <path d="M6.5 8.5 5 5l3.5 1.5M17.5 8.5 19 5l-3.5 1.5" />
    <path d="M10 14h.01M14 14h.01" />
  </svg>
);

const Cosmetics = () => (
  <svg {...base}>
    <path d="M10 3h4v3h-4z" />
    <path d="M8 21V9a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v12z" />
    <path d="M8 13h8" />
  </svg>
);

const Biomedical = () => (
  <svg {...base}>
    <path d="M12 21s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.6 12 21 12 21z" />
    <path d="M12 11v4M10 13h4" />
  </svg>
);

const FoodBeverage = () => (
  <svg {...base}>
    <path d="M6.5 3v6a2.5 2.5 0 0 0 5 0V3" />
    <path d="M9 11.5V21" />
    <path d="M15.5 3h4v7a2 2 0 0 1-2 2h-2z" />
    <path d="M17.5 12v9" />
  </svg>
);

const WasteWater = () => (
  <svg {...base}>
    <path d="M12 3s5 6 5 9.5A5 5 0 0 1 7 12.5C7 9 12 3 12 3z" />
    <path d="M4 20c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 4 0" />
  </svg>
);

const Textile = () => (
  <svg {...base}>
    <path d="M4 6h16M4 12h16M4 18h16" />
    <path d="M8 3v18M16 3v18" />
  </svg>
);

const PersonalCare = () => (
  <svg {...base}>
    <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
    <path d="M12 12c3 0 5.5-2.5 5.5-5.5C14.5 6.5 12 9 12 12z" />
    <path d="M12 12c-3 0-5.5-2.5-5.5-5.5C9.5 6.5 12 9 12 12z" />
  </svg>
);

const sectorIcons = {
  packaging: Packaging,
  agriculture: Agriculture,
  aquaculture: Aquaculture,
  "animal-husbandry": AnimalHusbandry,
  cosmetics: Cosmetics,
  "biomedical-healthcare": Biomedical,
  wastewater: WasteWater,
  textile: Textile,
  "personal-care": PersonalCare,
  "food-and-beverages": FoodBeverage,
};

export function SectorIcon({ slug }) {
  const Glyph = sectorIcons[slug] ?? Packaging;
  return <Glyph />;
}
