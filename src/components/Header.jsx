import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, navSecondary, company } from "../data/content";
import "./Header.css";

export default function Header() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const drawerId = useId();
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* a navigation always dismisses the drawer */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    // hold the page still behind the drawer
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // keep tabbing inside the drawer while it is open
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    drawerRef.current?.querySelector("a, button")?.focus();

    // capture the node now — the ref may have changed by cleanup time
    const toggle = toggleRef.current;

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      toggle?.focus();
    };
  }, [open]);

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

        <button
          className="masthead__burger"
          type="button"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className="masthead__burger-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* ---------- mobile app drawer ---------- */}
      <div
        className="drawer__scrim"
        hidden={!open}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className="drawer"
        id={drawerId}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <div className="drawer__top">
          <img
            className="drawer__logo"
            src="/media/brand/terraone-logo.png"
            alt="TerraOne"
            width="804"
            height="200"
          />
          <button className="drawer__close" type="button" onClick={() => setOpen(false)}>
            <span className="visually-hidden">Close menu</span>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Mobile">
          <p className="drawer__key">Explore</p>
          <ul>
            {nav.map((item, i) => (
              <li key={item.to} style={{ "--i": i }}>
                <NavLink to={item.to}>
                  <span className="drawer__idx">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="drawer__key">More</p>
          <ul className="drawer__nav--minor">
            {navSecondary.map((item, i) => (
              <li key={item.to} style={{ "--i": nav.length + i }}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot">
          <p className="drawer__key">Reach us</p>
          <address>
            <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
          <Link className="drawer__cta" to="/contact">
            Talk to us
          </Link>
        </div>
      </aside>
    </header>
  );
}
