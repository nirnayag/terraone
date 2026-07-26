import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./InvestorHero.css";

export default function InvestorHero() {
  useEffect(() => {
    document.title = "Investors — Backing a World First in Non-GMO Biopolymers | TerraOne";
  }, []);

  return (
    <section className="invhero-wrapper">
      {/* Single Organic Right Edge Wave Filled with 3D Biotech Image */}
      <div className="invhero-right-blob invhero-right-blob--image" aria-hidden="true">
        <img
          src="/media/decor/investor_hero_flask.png"
          alt=""
          className="invhero-wave-cover-img"
        />

        {/* Normalized 0..1 clipPath for responsive, non-distorted wave image clipping */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="heroSingleWaveClip" clipPathUnits="objectBoundingBox">
              <path d="M 1,0 L 1,1 L 0.538,1 C 0.192,0.8 0.115,0.6 0.423,0.433 C 0.731,0.267 0.462,0.133 0.231,0.05 C 0.077,0.017 0.308,0 0.538,0 Z" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="shell">
        <div className="invhero-content">
          <div className="invhero-eyebrow">
            <span className="invhero-eyebrow__arrow">➔</span>
            <span className="invhero-eyebrow__text">INVESTORS</span>
          </div>

          <h1 className="invhero-title">
            Backing a<br />
            world <em className="invhero-title__first">first</em>
          </h1>

          <p className="invhero-lede">
            TerraOne is the first company anywhere producing PHA entirely without genetically modified organisms, with 50,000 TPA of capacity planned.
          </p>

          <div className="invhero-actions">
            <a
              href="mailto:investors@terraone.com?subject=Investor%20Brief%20Request"
              className="invhero-btn invhero-btn--green"
            >
              Request Investor Brief
              <span className="invhero-btn__arrow">↗</span>
            </a>
            <Link to="/technology" className="invhero-btn invhero-btn--outline">
              Read the Technology
              <span className="invhero-btn__arrow">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
