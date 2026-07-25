import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, navSecondary, company } from "../data/content";
import "./Header.css";

export default function Header() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // a navigation always dismisses the sheet
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`masthead${lifted ? " is-lifted" : ""}${open ? " is-open" : ""}`}>
      <div className="masthead__bar shell">
        <Link className="masthead__logo" to="/" aria-label="TerraOne — home">
          <img src="/media/brand/terraone-logo.png" alt="TerraOne" width="804" height="200" />
        </Link>

        <nav className="masthead__nav" aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="masthead__end">
          <button
            className="masthead__toggle"
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className="masthead__dots" aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <i key={i} />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div className="masthead__sheet" id="menu-sheet" hidden={!open}>
        <div className="masthead__sheet-inner shell">
          <ul>
            {[...nav, ...navSecondary].map((item, i) => (
              <li key={item.to} style={{ "--i": i }}>
                <NavLink to={item.to}>
                  <span className="masthead__idx">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="masthead__aside">
            <p className="masthead__key">Reach us</p>
            <address>
              {company.address}
              <br />
              <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </address>
            <Link className="btn btn--fill" to="/contact">
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
