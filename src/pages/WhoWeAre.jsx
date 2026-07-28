import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WhoWeAre.css";

const bgImages = [
  "/media/decor/whoweare_hero_bg.png",
  "/media/decor/whoweare_hero_sd.png",
];

const orbImages = [
  "/media/decor/whoweare_hero_orb.png",
  "/media/decor/whoweare_hero_orbs.png",
];

export default function WhoWeAre() {
  const [bgImage] = useState(() => bgImages[Math.floor(Math.random() * bgImages.length)]);
  const [orbImage] = useState(() => orbImages[Math.floor(Math.random() * orbImages.length)]);

  return (
    <div className="whoweare-page">
      {/* ══════════════════════════════════════════════════════════════════
          §01 ORGANIC HERO SECTION
          Green background + right organic SVG shape + bottom curve + glass orb visual
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="whoweare-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(14,42,51,0.35) 0%, rgba(14,42,51,0.15) 50%, rgba(14,42,51,0.4) 100%), url("${bgImage}")`,
        }}
      >
        <div className="whoweare-hero__container">
          {/* Left Content Column */}
          <div className="whoweare-hero__left">
            <div className="whoweare-hero__badge">
              🌍 WHO WE ARE
            </div>

            <h1 className="whoweare-hero__title">
              Redefining<br />
              sustainability through<br />
              next-generation<br />
              innovations
            </h1>

            <h2 className="whoweare-hero__subtitle">
              ADVANCED BIOLOGY &amp; CLEAN TECHNOLOGY
            </h2>

            <p className="whoweare-hero__desc">
              TerraOne is a modern biotechnology company. Our portfolio combines advanced biology with clean technology to deliver precision nutrition, intelligent release systems, and environmentally elegant performance.
            </p>
          </div>

          {/* Right Column Glass Sphere with random orb image */}
          <div className="whoweare-hero__right">
            <div className="whoweare-hero__glass-circle">
              <img
                src={orbImage}
                alt="3D Biopolymer Innovation"
                className="whoweare-hero__orb-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §02 STATS BANNER BAR
          Floating rounded card with 4 stat columns
      ══════════════════════════════════════════════════════════════════ */}
      <section className="whoweare-stats-section">
        <div className="shell">
          <div className="whoweare-stats__card">
            
            {/* Stat 1 */}
            <div className="whoweare-stats__item">
              <div className="whoweare-stats__dash whoweare-stats__dash--blue" />
              <div className="whoweare-stats__number">World first</div>
              <div className="whoweare-stats__label">Non-GMO PHA biopolymer manufacturer</div>
            </div>

            {/* Stat 2 */}
            <div className="whoweare-stats__item">
              <div className="whoweare-stats__dash whoweare-stats__dash--green" />
              <div className="whoweare-stats__number">50,000 TPA</div>
              <div className="whoweare-stats__label">Planned production capacity</div>
            </div>

            {/* Stat 3 */}
            <div className="whoweare-stats__item">
              <div className="whoweare-stats__dash whoweare-stats__dash--blue" />
              <div className="whoweare-stats__number">100%</div>
              <div className="whoweare-stats__label">Biodegradable</div>
            </div>

            {/* Stat 4 */}
            <div className="whoweare-stats__item">
              <div className="whoweare-stats__dash whoweare-stats__dash--green" />
              <div className="whoweare-stats__number">10 sectors</div>
              <div className="whoweare-stats__label">Industries served</div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §03 NUMBERED NARRATIVE / CORE PILLARS
          01, 02, 03 circular number badges + detailed paragraphs
      ══════════════════════════════════════════════════════════════════ */}
      <section className="whoweare-narrative">
        <div className="shell">
          <div className="whoweare-narrative__list">
            
            {/* Pillar 01 */}
            <div className="whoweare-pillar">
              <div className="whoweare-pillar__num-wrap">
                <div className="whoweare-pillar__circle">
                  <span className="whoweare-pillar__num">01</span>
                  <span className="whoweare-pillar__dot" />
                </div>
              </div>
              <div className="whoweare-pillar__content">
                <h2 className="whoweare-pillar__title">A material with no ending</h2>
                <p className="whoweare-pillar__body">
                  Conventional plastic is derived from petroleum and engineered to endure, yet the majority of it is discarded within minutes of first use. The consequences are long-lived: it persists in landfill for centuries, fragments into particles too small to recover, and migrates through soil, water and, ultimately, the food chain. Only a modest share is ever recycled, and much of what is collected is downcycled once before being discarded permanently. The material was never intended to have an ending, and it does not have one.
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="whoweare-narrative__divider" />

            {/* Pillar 02 */}
            <div className="whoweare-pillar">
              <div className="whoweare-pillar__num-wrap">
                <div className="whoweare-pillar__circle">
                  <span className="whoweare-pillar__num">02</span>
                  <span className="whoweare-pillar__dot" />
                </div>
              </div>
              <div className="whoweare-pillar__content">
                <h2 className="whoweare-pillar__title">An ending that resolves itself</h2>
                <p className="whoweare-pillar__body">
                  PHA is a naturally occurring polymer generated through fermentation, and the same microorganisms that synthesise it in nature are equally capable of breaking it down. In soil, in compost and in seawater it degrades fully and leaves no microplastic residue. No specialist facility is required, and no waste stream remains to be managed. In use it performs comparably to conventional plastic — reliable material performance, coupled with an end-of-life that resolves itself.
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="whoweare-narrative__divider" />

            {/* Pillar 03 */}
            <div className="whoweare-pillar">
              <div className="whoweare-pillar__num-wrap">
                <div className="whoweare-pillar__circle">
                  <span className="whoweare-pillar__num">03</span>
                  <span className="whoweare-pillar__dot" />
                </div>
              </div>
              <div className="whoweare-pillar__content">
                <h2 className="whoweare-pillar__title">Why non-GMO matters</h2>
                <p className="whoweare-pillar__body">
                  TerraOne is the first company in the world to produce PHA entirely without genetically modified organisms. The fermentation runs on naturally occurring strains and renewable feedstocks. For buyers in food contact, cosmetics and regulated agricultural markets, that removes a compliance question before it is asked.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          §04 BOTTOM CTA PANEL
          Gradient dark panel with green dot-matrix visual
      ══════════════════════════════════════════════════════════════════ */}
      <section className="whoweare-cta-section">
        <div className="shell">
          <div className="whoweare-cta">
            
            {/* Left CTA Text & Buttons */}
            <div className="whoweare-cta__left">
              <h2 className="whoweare-cta__title">
                Want the detail behind<br />
                the material rather than<br />
                the summary?
              </h2>

              <div className="whoweare-cta__actions">
                <Link to="/technology" className="whoweare-cta__btn whoweare-cta__btn--primary">
                  Read the technology
                  <svg className="whoweare-cta__arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>

                <Link to="/application" className="whoweare-cta__btn whoweare-cta__btn--ghost">
                  See the applications
                  <svg className="whoweare-cta__arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Decorative Dot Matrix Graphic */}
            <div className="whoweare-cta__right">
              <div className="whoweare-cta__matrix">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span key={i} className="whoweare-cta__dot" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
