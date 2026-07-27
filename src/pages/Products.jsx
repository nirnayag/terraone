import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Products.css";

/* ══════════════════════════════════════════════════════════════════
   CATEGORY DEFINITIONS WITH ICONS
   ══════════════════════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    id: "",
    slug: "",
    name: "All products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "packaging",
    slug: "packaging",
    name: "Packaging",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: "agriculture",
    slug: "agriculture",
    name: "Agriculture & Horticulture",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22V12" />
        <path d="M12 12C12 7 7 4 3 5c0 5 3 10 9 10z" />
        <path d="M12 12c0-5 5-8 9-7 0 5-3 10-9 10z" />
      </svg>
    ),
  },
  {
    id: "food-service",
    slug: "food-service",
    name: "Food Service",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 8H3l1 12a2 2 0 002 2h12a2 2 0 002-2l1-12z" />
        <path d="M7 8V5a2 2 0 012-2h6a2 2 0 012 2v3" />
      </svg>
    ),
  },
  {
    id: "personal-care",
    slug: "personal-care",
    name: "Personal Care",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  },
  {
    id: "animal-nutrition",
    slug: "animal-nutrition",
    name: "Animal Nutrition",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 00-5 5c0 3.5 2.5 6 6 6s6-2.5 6-6a5 5 0 00-7-5z" />
      </svg>
    ),
  },
  {
    id: "aquaculture",
    slug: "aquaculture",
    name: "Aquaculture & Fisheries",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6.5 12c.94-2.07 3.08-3.5 5.5-3.5s4.56 1.43 5.5 3.5c-.94 2.07-3.08 3.5-5.5 3.5s-4.56-1.43-5.5-3.5z" />
        <path d="M18 12l4-3v6l-4-3z" />
        <circle cx="10" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "biodegradable-inputs",
    slug: "biodegradable-inputs",
    name: "Biodegradable Inputs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 19l-4-4 4-4" />
        <path d="M3 15h11a4 4 0 004-4V5" />
        <path d="M17 5l4 4-4 4" />
      </svg>
    ),
  },
  {
    id: "horeca-utensils",
    slug: "horeca-utensils",
    name: "Horeca & Utensils",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 2v20" />
        <path d="M18 2c-1.5 0-3 1.5-3 4v4c0 1.5 1.5 3 3 3s3-1.5 3-3V6c0-2.5-1.5-4-3-4z" />
        <path d="M6 2v7a2 2 0 002 2v11" />
        <path d="M10 2v7" />
        <path d="M6 2v7" />
      </svg>
    ),
  },
];

/* ══════════════════════════════════════════════════════════════════
   FULL 30-PRODUCT CATALOGUE DATA
   ══════════════════════════════════════════════════════════════════ */
const PRODUCTS_DATA = [
  {
    id: "p1",
    slug: "grocery-bag",
    title: "Grocery Bag",
    category: "packaging",
    categoryLabel: "PACKAGING",
    excerpt: "Designed for strength with a lower environmental impact.",
    image: "/media/decor/products_hero_catalogue.png",
  },
  {
    id: "p2",
    slug: "carry-bags",
    title: "Carry Bags",
    category: "packaging",
    categoryLabel: "PACKAGING",
    excerpt: "Multipurpose bags for retail and everyday use.",
    image: "/media/decor/products_hero_catalogue.png",
  },
  {
    id: "p3",
    slug: "food-packaging",
    title: "Food Packaging",
    category: "packaging",
    categoryLabel: "PACKAGING",
    excerpt: "Compostable solutions for food containers and trays.",
    image: "/media/sectors/packaging.jpg",
  },
  {
    id: "p4",
    slug: "food-wrap-sheet",
    title: "Food Wrap Sheet",
    category: "packaging",
    categoryLabel: "PACKAGING",
    excerpt: "Food-safe protective sheets for wrapping and lining.",
    image: "/media/sectors/packaging.jpg",
  },
  {
    id: "p5",
    slug: "cutlery-single-use",
    title: "Cutlery Single Use",
    category: "horeca-utensils",
    categoryLabel: "HORECA & UTENSILS",
    excerpt: "Compostable cutlery for clean, convenient dining.",
    image: "/media/decor/products_hero_catalogue.png",
  },
  {
    id: "p6",
    slug: "mulching-film",
    title: "Mulching Film",
    category: "agriculture",
    categoryLabel: "AGRICULTURE",
    excerpt: "Biodegradable film for sustainable agriculture and weed control.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p7",
    slug: "primary-packaging-material",
    title: "Primary Packaging Material",
    category: "packaging",
    categoryLabel: "PACKAGING",
    excerpt: "High-performance films and laminates for flexible packaging.",
    image: "/media/sectors/packaging.jpg",
  },
  {
    id: "p8",
    slug: "human-essentials",
    title: "Human Essentials",
    category: "personal-care",
    categoryLabel: "PERSONAL CARE",
    excerpt: "PHA-based personal care ingredients and additives.",
    image: "/media/sectors/cosmetics.jpg",
  },
  {
    id: "p9",
    slug: "terrapro-ga05",
    title: "TerraPro-GA05",
    category: "biodegradable-inputs",
    categoryLabel: "MATERIAL – POWDER",
    excerpt: "General grade PHA powder for multiple applications.",
    image: "/media/decor/sprout.png",
  },
  {
    id: "p10",
    slug: "terrapro-ph10",
    title: "TerraPro-PH10",
    category: "biodegradable-inputs",
    categoryLabel: "MATERIAL – POWDER",
    excerpt: "High purity PHA powder for advanced formulations.",
    image: "/media/decor/sprout.png",
  },
  {
    id: "p11",
    slug: "terrapro-bc20",
    title: "TerraPro-BC20",
    category: "biodegradable-inputs",
    categoryLabel: "MATERIAL – POWDER",
    excerpt: "Specialty PHA powder for barrier and strength.",
    image: "/media/decor/sprout.png",
  },
  {
    id: "p12",
    slug: "terrabio-sr30",
    title: "TerraBio-SR30",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Support for soil health and plant growth.",
    image: "/media/decor/sprout.png",
  },
  {
    id: "p13",
    slug: "terracide-herbio",
    title: "TerraCIDE-Herbio",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Biodegradable herbicide carrier and matrix.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p14",
    slug: "terrabio-bs70",
    title: "TerraBIO-BS70",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Beneficial soil additive and microbial support.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p15",
    slug: "pterrabio-sr30",
    title: "PTerraBIO-SR30",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Plant-safe granular input for crop protection.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p16",
    slug: "mterrabio-sr30",
    title: "mTerraBIO-SR30",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Microbial based input for soil and plant health.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p17",
    slug: "kterrabio-sr30",
    title: "KTerraBIO-SR30",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Nutrient-enriched granules for soil enhancement.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p18",
    slug: "feterrabio-sr30",
    title: "FeTerraBIO-SR30",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Iron-based input to support plant nutrition.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p19",
    slug: "cuterrabio-sr30",
    title: "CuTerraBIO-SR30",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Copper-based input for balanced growth.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p20",
    slug: "terrafuno-np",
    title: "TerraFUNO-NP",
    category: "biodegradable-inputs",
    categoryLabel: "BIO INPUT – GRANULES",
    excerpt: "Natural polymer granules for multipurpose use.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p21",
    slug: "aquaculture-feed-pellets",
    title: "AquaFEED Pellets",
    category: "aquaculture",
    categoryLabel: "AQUACULTURE & FISHERIES",
    excerpt: "Controlled release nutrition for fish and marine farms.",
    image: "/media/sectors/aquaculture.jpg",
  },
  {
    id: "p22",
    slug: "livestock-bio-binder",
    title: "Livestock BioBinder",
    category: "animal-nutrition",
    categoryLabel: "ANIMAL NUTRITION",
    excerpt: "Digestible polymer binder for animal feed formulations.",
    image: "/media/sectors/animal-husbandry.jpg",
  },
  {
    id: "p23",
    slug: "pharma-release-matrix",
    title: "Pharma Release Matrix",
    category: "personal-care",
    categoryLabel: "PHARMACEUTICAL",
    excerpt: "Biomedical grade PHA for targeted drug delivery systems.",
    image: "/media/sectors/pharmaceutical.jpg",
  },
  {
    id: "p24",
    slug: "biomedical-mesh",
    title: "BioMedical Mesh",
    category: "personal-care",
    categoryLabel: "BIOMEDICAL",
    excerpt: "Resorbable surgical matrix and tissue scaffold.",
    image: "/media/sectors/biomedical.jpg",
  },
  {
    id: "p25",
    slug: "textile-eco-fiber",
    title: "Textile EcoFiber",
    category: "packaging",
    categoryLabel: "TEXTILES",
    excerpt: "Biodegradable filament for sustainable apparel and nonwovens.",
    image: "/media/sectors/textile.jpg",
  },
  {
    id: "p26",
    slug: "water-purify-beads",
    title: "WaterPurify Beads",
    category: "biodegradable-inputs",
    categoryLabel: "WASTEWATER",
    excerpt: "Denitrification substrate for industrial water treatment.",
    image: "/media/sectors/wastewater.jpg",
  },
  {
    id: "p27",
    slug: "compostable-food-tray",
    title: "Compostable Food Tray",
    category: "food-service",
    categoryLabel: "FOOD SERVICE",
    excerpt: "Rigid heat-resistant trays for prepared meals.",
    image: "/media/decor/products_hero_catalogue.png",
  },
  {
    id: "p28",
    slug: "beverage-cup-lid",
    title: "Beverage Cup & Lid",
    category: "food-service",
    categoryLabel: "FOOD SERVICE",
    excerpt: "100% bio-based hot and cold beverage packaging.",
    image: "/media/decor/products_hero_catalogue.png",
  },
  {
    id: "p29",
    slug: "agri-seed-coating",
    title: "Agri Seed Coating",
    category: "agriculture",
    categoryLabel: "AGRICULTURE",
    excerpt: "Biodegradable protective matrix for crop seeds.",
    image: "/media/sectors/agriculture.jpg",
  },
  {
    id: "p30",
    slug: "cosmetic-micro-beads",
    title: "Cosmetic BioBeads",
    category: "personal-care",
    categoryLabel: "PERSONAL CARE",
    excerpt: "Natural microplastic replacement for exfoliants and scrubs.",
    image: "/media/sectors/cosmetics.jpg",
  },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") ?? "";
  const [sortBy, setSortBy] = useState("a-z");

  const selectCategory = (slug) => {
    const p = new URLSearchParams();
    if (slug) p.set("category", slug);
    setParams(p);
  };

  /* Filter and Sort logic */
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS_DATA;
    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (sortBy === "a-z") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "z-a") {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    }
    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="products-page">
      {/* ══════════════════════════════════════════════════════════════════
          §01 HERO SECTION — Full-bleed background image
      ══════════════════════════════════════════════════════════════════ */}
      <section className="products-hero">
        <div className="shell products-hero__shell">
          <div className="products-hero__content">
            <div className="products-hero__eyebrow">
              <span className="products-hero__eyebrow-dot" />
              <span>PRODUCTS</span>
            </div>

            <h1 className="products-hero__title">The catalogue</h1>

            <p className="products-hero__lead">
              Finished materials and biological inputs built on TerraOne PHA.
            </p>
            <p className="products-hero__sublead">
              Every line is curated per application — tell us the volume and the spec and we will price it.
            </p>
          </div>
        </div>

        {/* Bottom Curve Divider */}
        <div className="products-hero__wave">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 720,10 1080,45 C1260,62 1360,20 1440,35 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §02 CATEGORY NAVIGATION BAR WITH ICONS
          Floating white bar with category icon items
      ══════════════════════════════════════════════════════════════════ */}
      <section className="products-cats-section">
        <div className="shell">
          <div className="products-cats__bar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id || "all"}
                  onClick={() => selectCategory(cat.slug)}
                  className={`products-cats__tab ${isActive ? "is-active" : ""}`}
                >
                  <div className="products-cats__icon">{cat.icon}</div>
                  <span className="products-cats__name">{cat.name}</span>
                  {isActive && <div className="products-cats__active-line" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §03 CATALOGUE GRID HEADER & SORTING
          "Showing 30 products" + "Sort by: A-Z"
      ══════════════════════════════════════════════════════════════════ */}
      <section className="products-list-section">
        <div className="shell">
          <div className="products-toolbar">
            <div className="products-toolbar__count">
              Showing <strong>{filteredProducts.length}</strong> products
            </div>

            <div className="products-toolbar__sort">
              <label htmlFor="sort-select" className="products-toolbar__sort-label">
                Sort by:
              </label>
              <div className="products-toolbar__select-wrapper">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="products-toolbar__select"
                >
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
                <svg className="products-toolbar__select-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              §04 4-COLUMN PRODUCT CARDS GRID
              ══════════════════════════════════════════════════════════════════ */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <Link to={`/products/${p.slug}`} className="product-card__link">
                    {/* Top Product Image Container */}
                    <div className="product-card__image-frame">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="product-card__img"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottom Card Body */}
                    <div className="product-card__body">
                      <div className="product-card__cat-label">{p.categoryLabel}</div>
                      <h3 className="product-card__title">{p.title}</h3>
                      <p className="product-card__excerpt">{p.excerpt}</p>
                      <div className="product-card__arrow">
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-empty">
              <h3>No products found in this category</h3>
              <p>Try selecting another category or viewing all products.</p>
              <button onClick={() => selectCategory("")} className="products-empty__btn">
                Show all products
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
