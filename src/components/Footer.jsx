import { Link } from "react-router-dom";
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
              <div className="ft-contact-item">
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
              </div>

              {/* Item 2: Call Us */}
              <div className="ft-contact-item">
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
              </div>

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
                  <a href="mailto:info@terraone.com" className="ft-contact-link">
                    info@terraone.com
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
            <ul className="ft-links">
              <li>
                <Link to="/">
                  <span className="ft-chevron">&gt;</span> Home
                </Link>
              </li>
              <li>
                <Link to="/who-we-are">
                  <span className="ft-chevron">&gt;</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/application">
                  <span className="ft-chevron">&gt;</span> Application
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <span className="ft-chevron">&gt;</span> Products
                </Link>
              </li>
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
              {/* X / Twitter */}
              <a href="#" className="ft-social-btn" aria-label="X / Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="ft-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Email */}
              <a href="mailto:info@terrapha.com" className="ft-social-btn" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              {/* Link / Website */}
              <a href="#" className="ft-social-btn" aria-label="Link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
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
