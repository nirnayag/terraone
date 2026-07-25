import { useState } from "react";
import { Link } from "react-router-dom";
import { nav, navSecondary, company } from "../data/content";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  /* There is no mailing list to post to — Mailchimp (MC4WP) is installed on
     the WordPress side but deactivated, so no subscribe endpoint exists.
     Rather than show a success message for something that did not happen,
     this hands the address to the team by email. Replace with a real endpoint
     once a provider is activated. */
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      "Subscribe to updates",
    )}&body=${encodeURIComponent(`Please add this address to the TerraOne updates list:\n\n${email}`)}`;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/media/brand/terraone-logo.png"
            alt="TerraOne"
            width="804"
            height="200"
          />
          <p className="footer__line">
            Biopolymers grown by fermentation, without genetic modification.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <p className="footer__key">Navigate</p>
          <ul>
            {[...nav, ...navSecondary].map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <p className="footer__key">Registered office</p>
          <address>
            {company.address}
            <br />
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
        </div>

        <div className="footer__signup">
          <p className="footer__key">Updates</p>
          <p className="footer__blurb">
            Occasional notes on grades, certifications and where PHA is heading. Send us your
            address and we'll add you.
          </p>
          <form className="signup" onSubmit={onSubmit}>
            <label className="visually-hidden" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              className="signup__field"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="signup__submit" type="submit">
              Subscribe
            </button>
          </form>
          <p className="signup__status" role="status">
            {sent ? "Your mail app should have opened — send it and we'll add you." : ""}
          </p>
        </div>
      </div>

      <div className="shell footer__base">
        <p className="footer__copy">TerraOne © {new Date().getFullYear()}. All rights reserved.</p>
        <ul className="footer__legal">
          {company.legal.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <ul className="footer__social">
          {company.social.map((s) => (
            <li key={s.label}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
