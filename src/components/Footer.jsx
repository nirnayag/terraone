import { Link } from "react-router-dom";
import { nav } from "../data/content";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ft-footer">
      <div className="shell">
        {/* Main 4-Column Grid */}
        <div className="ft-grid">
          {/* ═══════════════════════════════════════════════════════════
              COLUMN 1 — BRAND LOGO & STACKED CONTACT CARDS
          ═══════════════════════════════════════════════════════════ */}
          <div className="ft-col ft-col--brand">
            <Link to="/" className="ft-logo-link">
              <img
                className="ft-logo"
                src="/media/brand/terraone-logo.png"
                alt="TerraOne Biotech"
              />
            </Link>
            <p className="ft-tagline">
              Developing innovative biopolymer solutions for a sustainable future.
            </p>

            {/* Stacked Contact Info */}
            <div className="ft-contact-stack">
              {/* Item 1: Registered Office */}
              {/* <div className="ft-contact-item">
                <div className="ft-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="ft-contact-details">
                  <h4 className="ft-contact-title">Registered Office</h4>
                  <address className="ft-contact-text">
                    203, Millennium Plaza, Sakinaka Telephone Exchange, Sakinaka, Mumbai - 400072
                  </address>
                </div>
              </div> */}

              {/* Item 2: Call Us */}
              {/* <div className="ft-contact-item">
                <div className="ft-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="ft-contact-details">
                  <h4 className="ft-contact-title">Call Us</h4>
                  <a href="tel:+918058005805" className="ft-contact-link">
                    +91 805 8005 805
                  </a>
                </div>
              </div> */}

              {/* Item 3: Email Us */}
              <div className="ft-contact-item">
                <div className="ft-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="ft-contact-details">
                  <h4 className="ft-contact-title">Email Us</h4>
                  <a href="mailto:info@terra1one.com" className="ft-contact-link">
                    info@terra1one.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              COLUMN 2 — QUICK LINKS
          ═══════════════════════════════════════════════════════════ */}
          <div className="ft-col">
            <h3 className="ft-heading">Quick Links</h3>
            <div className="ft-heading-accent" aria-hidden="true" />
            <ul className="ft-links ft-links--two-col">
              <li>
                <Link to="/">
                  <span className="ft-chevron">&gt;</span> Home
                </Link>
              </li>
              {/* mirrors the header order — driven by the same `nav` list */}
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>
                    <span className="ft-chevron">&gt;</span> {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/collaboration">
                  <span className="ft-chevron">&gt;</span> Collaboration
                </Link>
              </li>
            </ul>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              COLUMN 3 — RESOURCES
          ═══════════════════════════════════════════════════════════ */}
          <div className="ft-col">
            <h3 className="ft-heading">Resources</h3>
            <div className="ft-heading-accent" aria-hidden="true" />
            <ul className="ft-links">
              <li>
                <Link to="/privacy-policy">
                  <span className="ft-chevron">&gt;</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use">
                  <span className="ft-chevron">&gt;</span> Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              COLUMN 4 — CONNECT WITH US
          ═══════════════════════════════════════════════════════════ */}
          <div className="ft-col">
            <h3 className="ft-heading">Connect With Us</h3>
            <div className="ft-heading-accent" aria-hidden="true" />
            <p className="ft-subtext">
              Follow us for the latest updates and insights.
            </p>
            <div className="ft-social-row">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/terra1one/"
                className="ft-social-btn"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.56.217.96.477 1.38.896.42.42.68.82.896 1.38.166.422.362 1.057.415 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.415 2.227-.217.56-.477.96-.896 1.38-.42.42-.82.68-1.38.896-.422.166-1.057.362-2.227.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.249-2.227-.415-.56-.217-.96-.477-1.38-.896-.42-.42-.68-.82-.896-1.38-.166-.422-.362-1.057-.415-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.249-1.805.415-2.227.217-.56.477-.96.896-1.38.42-.42.82-.68 1.38-.896.422-.166 1.057-.362 2.227-.415 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.058 1.277.261 2.15.558 2.912a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.762.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.15-.261 2.912-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.762.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.261-2.15-.558-2.912a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63c-.762-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* LinkedIn — logo only until the profile URL is confirmed */}
              <span className="ft-social-btn ft-social-btn--static" role="img" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </span>

              {/* X */}
              <a
                href="https://x.com/Terra1one"
                className="ft-social-btn"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BOTTOM SUB-FOOTER BAR
        ═══════════════════════════════════════════════════════════ */}
        <div className="ft-bottom">
          <p className="ft-copyright">
            © {currentYear} TerraOne Biotech. All rights reserved.
          </p>
          <div className="ft-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="ft-legal-sep">|</span>
            <Link to="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
