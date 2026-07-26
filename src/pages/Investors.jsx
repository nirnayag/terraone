import React from "react";
import { company } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import InvestorHero from "../components/InvestorHero";
import "./Investors.css";

/* ─────────────────────────────────────────────────────────────────────────
   SVG ORGANIC WAVE DIVIDERS
   Each wave uses a unique path from the user's gallery.
   fill = DESTINATION section's background colour.
   All waves use preserveAspectRatio="none" for perfect full-width stretch.
───────────────────────────────────────────────────────────────────────── */

/** Hero (paper #F7F9FA) → Snapshot (blue-10 #E6F6FC) */
function Wave01() {
  return (
    <div className="inv-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" height="120">
        <path
          fill="#E6F6FC"
          d="M0,60 C150,10 300,100 500,50 C700,0 900,90 1120,40 C1280,10 1380,70 1440,45 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

/** Snapshot (blue-10) → Thesis (white #FFFFFF) — Second Wave filled with 3D Biotech Image */
function Wave02() {
  return (
    <div className="inv-wave inv-wave--feature" aria-hidden="true">
      {/* Background 3D Biotech Illustration clipped inside organic wave */}
      <div className="inv-wave__img-wrapper">
        <img
          src="/media/decor/investor_hero_flask.png"
          alt=""
          className="inv-wave__cover-img"
        />
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="wave02Clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.444 C 0.139,0.056 0.292,0.778 0.486,0.361 C 0.667,0 0.819,0.611 1,0.306 L 1,1 L 0,1 Z" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Foreground Wave overlay for seamless transition */}
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" height="180">
        <path
          fill="#FFFFFF"
          d="M0,80 C200,10 420,140 700,65 C960,0 1180,110 1440,55 L1440,180 L0,180 Z"
        />
      </svg>
    </div>
  );
}

/** Thesis (white) → Trajectory (green-10 #F0F8EC) */
function Wave03() {
  return (
    <div className="inv-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" height="120">
        <path
          fill="#F0F8EC"
          d="M0,55 C120,130 260,20 420,80 C610,150 760,10 930,75 C1100,140 1260,30 1440,60 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

/** Trajectory (green-10) → Opportunity (mist #DCE6E8) */
function Wave04() {
  return (
    <div className="inv-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 130" preserveAspectRatio="none" height="130">
        <path
          fill="#DCE6E8"
          d="M0,70 C180,150 380,10 640,90 C920,170 1140,20 1440,80 L1440,130 L0,130 Z"
        />
      </svg>
    </div>
  );
}

/** Opportunity (mist #DCE6E8) → CTA (ink #0E2A33) */
function Wave05() {
  return (
    <div className="inv-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 130" preserveAspectRatio="none" height="130">
        <path
          fill="#0E2A33"
          d="M0,90 C260,10 520,20 760,100 C1000,180 1200,30 1440,70 L1440,130 L0,130 Z"
        />
      </svg>
    </div>
  );
}



/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */
export default function Investors() {
  const scope = useReveal();

  return (
    <div className="inv-root" ref={scope}>

      {/* ══════════════════════════════════════════════════════════════════
          §01  HERO
          bg #F7F9FA | heading #0E2A33 | CTA #00A0E1
      ══════════════════════════════════════════════════════════════════ */}
      <InvestorHero />

      {/* Organic wave: paper → blue-10 */}
      <Wave01 />

      {/* ══════════════════════════════════════════════════════════════════
          §02  INVESTMENT SNAPSHOT
          bg #E6F6FC (blue-10) | heading #0E2A33 | accent #0072BC
      ══════════════════════════════════════════════════════════════════ */}
      <section className="inv-snapshot">
        <div className="shell">
          {/* Grid of 4 individual organic blob cards */}
          <div className="inv-snapshot__grid">

            {/* Card 1 — World First */}
            <div className="inv-snapshot__card reveal" style={{ "--i": 0 }}>
              <div className="inv-snapshot__icon inv-snapshot__icon--blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0072BC" strokeWidth="2" width="28" height="28">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3 className="inv-snapshot__stat">WORLD FIRST</h3>
              <p className="inv-snapshot__label">Global Status</p>
              <p className="inv-snapshot__desc">Non-GMO PHA biopolymer manufacturer</p>
            </div>

            {/* Card 2 — 50,000 TPA */}
            <div className="inv-snapshot__card reveal" style={{ "--i": 1 }}>
              <div className="inv-snapshot__icon inv-snapshot__icon--blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0072BC" strokeWidth="2" width="28" height="28">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <path d="M4 8l4-4 4 4 6-6" />
                </svg>
              </div>
              <h3 className="inv-snapshot__stat">50,000</h3>
              <p className="inv-snapshot__label">TPA Capacity</p>
              <p className="inv-snapshot__desc">Planned production capacity target</p>
            </div>

            {/* Card 3 — 10+ Sectors */}
            <div className="inv-snapshot__card reveal" style={{ "--i": 2 }}>
              <div className="inv-snapshot__icon inv-snapshot__icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="2" width="28" height="28">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="inv-snapshot__stat">10+</h3>
              <p className="inv-snapshot__label">Sectors</p>
              <p className="inv-snapshot__desc">Addressable today across industries</p>
            </div>

            {/* Card 4 — 6 Technologies */}
            <div className="inv-snapshot__card reveal" style={{ "--i": 3 }}>
              <div className="inv-snapshot__icon inv-snapshot__icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="2" width="28" height="28">
                  <circle cx="12" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="18" r="3" />
                  <line x1="9" y1="8" x2="7.5" y2="15.5" />
                  <line x1="15" y1="8" x2="16.5" y2="15.5" />
                  <line x1="9" y1="18" x2="15" y2="18" />
                </svg>
              </div>
              <h3 className="inv-snapshot__stat">6</h3>
              <p className="inv-snapshot__label">Technologies</p>
              <p className="inv-snapshot__desc">Biopolymer technologies in portfolio</p>
            </div>

          </div>
        </div>
      </section>

      {/* Organic wave: blue-10 → white */}
      <Wave02 />

      {/* ══════════════════════════════════════════════════════════════════
          §03  INVESTMENT THESIS — "Why TerraOne, why now?"
          bg #FFFFFF | heading #0E2A33 | accent #6DBE45
      ══════════════════════════════════════════════════════════════════ */}
      <section className="inv-thesis">
        <div className="shell">
          <div className="inv-thesis__head reveal">
            <p className="inv-eyebrow inv-thesis__eyebrow">— Our Investment Case —</p>
            <h2 className="inv-section-title">
              Why <em>TerraOne</em>, why now?
            </h2>
            <p className="inv-section-sub" style={{ margin: "0 auto" }}>
              Four pillars that define the investment thesis for the world's first Non-GMO PHA producer.
            </p>
          </div>

          <div className="inv-thesis__grid">

            {/* Card 1 — The Thesis */}
            <div className="inv-thesis__card reveal" style={{ "--i": 0 }}>
              <div className="inv-thesis__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="1.8" width="24" height="24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="inv-thesis__card-title">The Thesis</h3>
              <p className="inv-thesis__card-body">
                Regulation is closing on persistent plastics faster than alternatives are scaling. Most compostable materials answer only the industrial-composting case. PHA answers the open-environment case — where regulatory pressure actually lands.
              </p>
            </div>

            {/* Card 2 — The Differentiator */}
            <div className="inv-thesis__card reveal" style={{ "--i": 1 }}>
              <div className="inv-thesis__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="1.8" width="24" height="24">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="inv-thesis__card-title">The Differentiator</h3>
              <p className="inv-thesis__card-body">
                Non-GMO production determines which food-contact, cosmetic and agricultural markets a material can be sold into. As the first producer to achieve this, TerraOne serves buyers for whom GMO-derived material is disqualifying.
              </p>
            </div>

            {/* Card 3 — Where Capital Goes */}
            <div className="inv-thesis__card reveal" style={{ "--i": 2 }}>
              <div className="inv-thesis__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="1.8" width="24" height="24">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <path d="M4 8l4-4 4 4 6-6" />
                </svg>
              </div>
              <h3 className="inv-thesis__card-title">Where Capital Goes</h3>
              <p className="inv-thesis__card-body">
                Fermentation capacity is the constraint. Capital scales production to 50,000 TPA, broadens grade range for more applications, and qualifies material for certifications each regulated sector requires.
              </p>
            </div>

            {/* Card 4 — The Honest Risk */}
            <div className="inv-thesis__card reveal" style={{ "--i": 3 }}>
              <div className="inv-thesis__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="1.8" width="24" height="24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="inv-thesis__card-title">The Honest Risk</h3>
              <p className="inv-thesis__card-body">
                Fermentation-based production costs more today than alternatives. PHA wins where true marine and soil biodegradability is required, and the size of that market is set by how quickly regulation makes it one.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Organic wave: white → green-10 */}
      <Wave03 />

      {/* ══════════════════════════════════════════════════════════════════
          §04  COMMERCIAL TRAJECTORY
          bg #F0F8EC (green-10) | heading #0E2A33 | accent #8CC63F
      ══════════════════════════════════════════════════════════════════ */}
      <section className="inv-traj">
        <div className="shell">
          <div className="inv-traj__head reveal">
            <p className="inv-eyebrow inv-traj__eyebrow">— Execution Phasing —</p>
            <h2 className="inv-section-title">Commercial Trajectory Track</h2>
            <p className="inv-section-sub" style={{ margin: "0 auto" }}>
              Transparent engineering checkpoints toward full market monetization.
            </p>
          </div>

          <div className="inv-traj__grid reveal">

            {/* Phase 01 */}
            <div className="inv-traj__card" style={{ "--i": 0 }}>
              <span className="inv-traj__arrow">➔</span>
              <div className="inv-traj__inner">
                <h3 className="inv-traj__card-title">Pilot Validation</h3>
                <p className="inv-traj__card-desc">
                  Secured configuration protections and verified baseline strain clarity indexes.
                </p>
              </div>
              <div className="inv-traj__img-wrap">
                <img src="/media/decor/inv_phase1.png" alt="Pilot Validation" className="inv-traj__img" />
              </div>
            </div>

            {/* Phase 02 */}
            <div className="inv-traj__card" style={{ "--i": 1 }}>
              <span className="inv-traj__arrow">➔</span>
              <div className="inv-traj__inner">
                <h3 className="inv-traj__card-title">Feedstock Optimization</h3>
                <p className="inv-traj__card-desc">
                  Optimized input architectures using circular side-streams for clean cost parities.
                </p>
              </div>
              <div className="inv-traj__img-wrap">
                <img src="/media/decor/inv_phase2.png" alt="Feedstock Optimization" className="inv-traj__img" />
              </div>
            </div>

            {/* Phase 03 */}
            <div className="inv-traj__card" style={{ "--i": 2 }}>
              <span className="inv-traj__arrow">➔</span>
              <div className="inv-traj__inner">
                <h3 className="inv-traj__card-title">Enterprise Licensing</h3>
                <p className="inv-traj__card-desc">
                  Deploying modular configuration rights across international converter markets.
                </p>
              </div>
              <div className="inv-traj__img-wrap">
                <img src="/media/decor/inv_phase3.png" alt="Enterprise Licensing" className="inv-traj__img" />
              </div>
            </div>

            {/* Phase 04 */}
            <div className="inv-traj__card" style={{ "--i": 3 }}>
              <div className="inv-traj__inner">
                <h3 className="inv-traj__card-title">Sustained Scale</h3>
                <p className="inv-traj__card-desc">
                  Activating regional compounding hubs to satisfy global packaging pipelines.
                </p>
              </div>
              <div className="inv-traj__img-wrap">
                <img
                  src="/media/decor/investor_hero_flask.png"
                  alt="Sustained Scale"
                  className="inv-traj__img"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Organic wave: green-10 → mist */}
      <Wave04 />

      {/* ══════════════════════════════════════════════════════════════════
          §05  GLOBAL OPPORTUNITY
          bg #DCE6E8 (mist) | heading #0E2A33
          accent #00A0E1 (blue items) + #6DBE45 (green items) separately
      ══════════════════════════════════════════════════════════════════ */}
      <section className="inv-opportunity">
        <div className="shell">
          <div className="inv-opportunity__head reveal">
            <p className="inv-eyebrow inv-opportunity__eyebrow">— Market Context —</p>
            <h2 className="inv-section-title">The Global Opportunity</h2>
            <p className="inv-section-sub" style={{ margin: "0 auto" }}>
              The regulatory and commercial forces that make this the right time to invest.
            </p>
          </div>

          <div className="inv-opportunity__layout reveal">

            {/* Left: main big stat blob */}
            <div className="inv-opportunity__main">
              <span className="inv-opportunity__main-tag">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                  <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                Addressable Market
              </span>
              <p className="inv-opportunity__big-number">$1.4B</p>
              <p className="inv-opportunity__big-label">Global Biopolymer Market by 2028</p>
              <p className="inv-opportunity__big-body">
                Single-use plastic regulation is advancing across 60+ jurisdictions. PHA is the only certified compostable material that also biodegrades in open marine and soil environments — the critical distinction that both regulators and major brand owners are beginning to require rather than simply prefer.
              </p>
            </div>

            {/* Right: 3 stacked small blob cards */}
            <div className="inv-opportunity__stack">

              {/* Blue — Regulatory Tailwinds */}
              <div className="inv-opportunity__card inv-opportunity__card--blue" style={{ "--i": 0 }}>
                <div className="inv-opportunity__card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00A0E1" strokeWidth="2" width="22" height="22">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div className="inv-opportunity__card-body">
                  <h4 className="inv-opportunity__card-title">Regulatory Tailwinds</h4>
                  <p className="inv-opportunity__card-desc">60+ jurisdictions banning single-use plastics — creating the mandatory demand floor PHA producers need.</p>
                </div>
              </div>

              {/* Green — Open-Environment Demand */}
              <div className="inv-opportunity__card inv-opportunity__card--green" style={{ "--i": 1 }}>
                <div className="inv-opportunity__card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6DBE45" strokeWidth="2" width="22" height="22">
                    <path d="M12 21v-7" />
                    <path d="M12 14c0-4 3.5-7 7.5-7 0 4-3.5 7-7.5 7z" />
                    <path d="M12 17c0-3.2-2.8-5.8-6-5.8 0 3.2 2.8 5.8 6 5.8z" />
                  </svg>
                </div>
                <div className="inv-opportunity__card-body">
                  <h4 className="inv-opportunity__card-title">Open-Environment Demand</h4>
                  <p className="inv-opportunity__card-desc">Marine-safe biodegradation is a compliance requirement in agriculture, aquaculture and ocean-facing applications.</p>
                </div>
              </div>

              {/* Blue — GMO-Free Premium */}
              <div className="inv-opportunity__card inv-opportunity__card--blue" style={{ "--i": 2 }}>
                <div className="inv-opportunity__card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00A0E1" strokeWidth="2" width="22" height="22">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div className="inv-opportunity__card-body">
                  <h4 className="inv-opportunity__card-title">GMO-Free Premium</h4>
                  <p className="inv-opportunity__card-desc">Food-contact, cosmetic and pharmaceutical buyers cannot use GMO-derived materials — TerraOne is the only qualified supplier.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Organic wave: mist → ink */}
      <Wave05 />

      {/* ══════════════════════════════════════════════════════════════════
          §06  FINAL CTA
          bg #0E2A33 (ink) | heading #FFFFFF | accent #6DBE45
      ══════════════════════════════════════════════════════════════════ */}
      <section className="inv-cta">
        <div className="inv-cta__inner">
          <div className="shell">
            <div className="inv-cta__blob reveal">

              <div className="inv-cta__left">
                <p className="inv-eyebrow inv-cta__eyebrow">— Next Step —</p>
                <h2 className="inv-cta__heading">
                  We will walk you through the process, the capacity plan{" "}
                  <em>and the numbers.</em>
                </h2>
                <div className="inv-cta__buttons">
                  <a
                    href={`mailto:${company.email}?subject=${encodeURIComponent("Investor Enquiry")}`}
                    className="inv-cta__btn--primary"
                  >
                    Request Investor Brief
                    <span>↗</span>
                  </a>
                  <a
                    href={`mailto:${company.email}?subject=${encodeURIComponent("Contact Investor Relations")}`}
                    className="inv-cta__btn--ghost"
                  >
                    Contact Investor Relations
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="inv-cta__right">
                <div className="inv-cta__dome">
                  <img
                    src="/media/decor/biopolymer_molecule_3d_nature.png"
                    alt="TerraOne Biopolymer"
                    className="inv-cta__dome-img"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
