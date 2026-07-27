import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { findProductBySlug } from "../data/products";
import { fetchProduct } from "../lib/wp";
import { sanitiseHtml } from "../lib/sanitise";
import "./ProductDetail.css";

const CF7_ENDPOINT =
  "https://terrapha.com/wp-json/contact-form-7/v1/contact-forms/5/feedback";

/* ── Inquiry form using Contact Form 7 REST endpoint ─────────────── */
function InquiryForm({ productTitle }) {
  const [fields, setFields] = useState({
    "your-name": "",
    "your-email": "",
    "your-phone": "",
    "your-company": "",
    "your-message": `I am interested in ${productTitle}. Please send me pricing and availability details.\n\nVolume needed:\nApplication / end-use:\nCountry:`,
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const body = new FormData();
      Object.entries(fields).forEach(([k, v]) => body.append(k, v));
      body.append("_wpcf7_unit_tag", "wpcf7-f5-p0-o1");

      const res = await fetch(CF7_ENDPOINT, { method: "POST", body });
      const json = await res.json();

      if (json.status === "mail_sent") {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          json.message || "Something went wrong. Please try again or email us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="pd-form pd-form--success">
        <div className="pd-form__success-icon" aria-hidden="true">✓</div>
        <h3 className="pd-form__success-title">Enquiry sent!</h3>
        <p className="pd-form__success-body">
          We'll review your request and get back to you within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form className="pd-form" onSubmit={onSubmit} noValidate>
      <div className="pd-form__grid">
        <div className="pd-form__field">
          <label className="pd-form__label" htmlFor="pd-name">Full name *</label>
          <input
            id="pd-name"
            name="your-name"
            type="text"
            className="pd-form__input"
            placeholder="Your name"
            value={fields["your-name"]}
            onChange={onChange}
            required
          />
        </div>
        <div className="pd-form__field">
          <label className="pd-form__label" htmlFor="pd-email">Email *</label>
          <input
            id="pd-email"
            name="your-email"
            type="email"
            className="pd-form__input"
            placeholder="you@company.com"
            value={fields["your-email"]}
            onChange={onChange}
            required
          />
        </div>
        <div className="pd-form__field">
          <label className="pd-form__label" htmlFor="pd-phone">Phone</label>
          <input
            id="pd-phone"
            name="your-phone"
            type="tel"
            className="pd-form__input"
            placeholder="+91 ..."
            value={fields["your-phone"]}
            onChange={onChange}
          />
        </div>
        <div className="pd-form__field">
          <label className="pd-form__label" htmlFor="pd-company">Company</label>
          <input
            id="pd-company"
            name="your-company"
            type="text"
            className="pd-form__input"
            placeholder="Your company"
            value={fields["your-company"]}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="pd-form__field pd-form__field--full">
        <label className="pd-form__label" htmlFor="pd-message">Message *</label>
        <textarea
          id="pd-message"
          name="your-message"
          className="pd-form__textarea"
          rows={6}
          value={fields["your-message"]}
          onChange={onChange}
          required
        />
      </div>

      {status === "error" && (
        <p className="pd-form__error" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="pd-form__submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send enquiry →"}
      </button>
    </form>
  );
}

/* ── Product detail layout ──────────────────────────────────────── */
function DetailView({ product }) {
  return (
    <div className="pd-layout">
      {/* Left — sticky image */}
      <div className="pd-media">
        <div className="pd-media__frame">
          <img
            className="pd-media__img"
            src={product.image || "/media/decor/products_hero_catalogue.png"}
            alt={product.title}
          />
        </div>

        {/* Category badge below image */}
        <div className="pd-media__meta">
          <span className="pd-media__cat-badge">
            {product.categoryLabel || product.category}
          </span>
        </div>
      </div>

      {/* Right — content + form */}
      <div className="pd-copy">
        <h1 className="pd-copy__title">{product.title}</h1>

        <p className="pd-copy__excerpt">{product.excerpt}</p>

        {product.description && (
          <div className="pd-copy__description">
            {product.description}
          </div>
        )}

        {/* WP content if available */}
        {product.content && (
          <div
            className="prose pd-copy__prose"
            dangerouslySetInnerHTML={{ __html: sanitiseHtml(product.content) }}
          />
        )}

        {/* Key features */}
        <div className="pd-features">
          <div className="pd-feature">
            <span className="pd-feature__icon" aria-hidden="true">🌿</span>
            <span>100% biodegradable</span>
          </div>
          <div className="pd-feature">
            <span className="pd-feature__icon" aria-hidden="true">🔬</span>
            <span>Non-GMO PHA base</span>
          </div>
          <div className="pd-feature">
            <span className="pd-feature__icon" aria-hidden="true">🌍</span>
            <span>Marine & soil safe</span>
          </div>
          <div className="pd-feature">
            <span className="pd-feature__icon" aria-hidden="true">⚗️</span>
            <span>Application-specific grades</span>
          </div>
        </div>

        {/* Pricing note */}
        <div className="pd-pricing-note">
          <p className="pd-pricing-note__label">Pricing</p>
          <p className="pd-pricing-note__body">
            This catalogue is quoted per application. Send us your volume, format, and
            performance requirements and we'll come back with a grade and price.
          </p>
        </div>

        {/* Inquiry form */}
        <div className="pd-inquiry">
          <h2 className="pd-inquiry__heading">Make an enquiry</h2>
          <InquiryForm productTitle={product.title} />
        </div>
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────── */
export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);

    // 1. Try WP API first
    fetchProduct(slug)
      .then((wpProduct) => {
        // Merge WP data with local description if available
        const local = findProductBySlug(slug);
        setProduct({
          ...wpProduct,
          categoryLabel: local?.categoryLabel ?? wpProduct.categories[0]?.name ?? "",
          description: local?.description ?? "",
          image: wpProduct.image?.src ?? local?.image ?? "/media/decor/products_hero_catalogue.png",
        });
        setLoading(false);
      })
      .catch(() => {
        // 2. Fall back to local data
        const local = findProductBySlug(slug);
        if (local) {
          setProduct({
            ...local,
            categories: [{ name: local.categoryLabel, slug: local.category }],
            content: null,
          });
          setLoading(false);
        } else {
          setError("Product not found.");
          setLoading(false);
        }
      });
  }, [slug]);

  useEffect(() => {
    if (product) document.title = `${product.title} — TerraOne`;
  }, [product]);

  return (
    <div className="pd-page">
      <div className="shell">
        {/* Back link */}
        <Link className="pd-back" to="/products">
          <span aria-hidden="true">←</span> All products
        </Link>

        {loading && (
          <div className="pd-loading" aria-label="Loading product">
            <div className="pd-loading__spinner" />
            <p>Loading product…</p>
          </div>
        )}

        {error && !loading && (
          <div className="pd-error">
            <p className="pd-error__text">{error}</p>
            <Link className="pd-error__link" to="/products">Back to catalogue</Link>
          </div>
        )}

        {product && !loading && <DetailView product={product} />}
      </div>
    </div>
  );
}
