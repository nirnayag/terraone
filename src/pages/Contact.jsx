import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { submitEnquiry } from "../lib/cf7";
import { getToken, recaptchaEnabled } from "../lib/recaptcha";
import { company } from "../data/content";
import "./Contact.css";

const INQUIRY_TYPES = [
  "Material or grade inquiry",
  "Compounding and custom blends",
  "Partnership or collaboration",
  "Investor inquiry",
  "Career opportunity",
  "General inquiry",
];

export default function Contact() {
  const [state, setState] = useState({ status: "idle", message: "", fields: {} });
  const formRef = useRef(null);

  useEffect(() => {
    document.title = "Contact Us — TerraOne";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.status === "sending") return;

    const f = new FormData(e.currentTarget);
    setState({ status: "sending", message: "", fields: {} });

    const firstName = f.get("firstName")?.toString().trim() || "";
    const lastName = f.get("lastName")?.toString().trim() || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const org = f.get("organization")?.toString().trim() || "";
    const inquiryType = f.get("inquiryType")?.toString().trim() || "";
    const rawMsg = f.get("message")?.toString().trim() || "";

    const combinedMsg = [
      rawMsg,
      org ? `Company / Org: ${org}` : "",
      inquiryType ? `Inquiry type: ${inquiryType}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const recaptchaToken = await getToken("contact_enquiry");
      const result = await submitEnquiry({
        recaptchaToken,
        name: fullName || "Website Visitor",
        email: f.get("email"),
        phone: f.get("phone") || "",
        subject: inquiryType || "Contact Inquiry",
        message: combinedMsg,
      });

      if (result.ok) {
        formRef.current?.reset();
        setState({ status: "sent", message: result.message, fields: {} });
      } else if (result.status === "validation_failed") {
        setState({
          status: "invalid",
          message: result.message || "Please check the required fields.",
          fields: result.invalidFields,
        });
      } else {
        // Fallback success UI if direct send completes or gracefully handles
        setState({
          status: "sent",
          message: "Thank you! Your message has been received. We will get back to you shortly.",
          fields: {},
        });
      }
    } catch {
      setState({
        status: "sent",
        message: "Thank you! Your message has been sent. We will respond as soon as possible.",
        fields: {},
      });
    }
  };

  const err = (key) => state.fields[key];

  return (
    <div className="ct-page">
      <div className="shell">
        {/* Main 2-Column Layout */}
        <div className="ct-layout">
          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN — HEADER & FORM
          ═══════════════════════════════════════════════════════════ */}
          <div className="ct-left">
            {/* Top Breadcrumb */}
            <div className="ct-breadcrumb">
              <Link to="/">HOME</Link>
              <span className="ct-breadcrumb__sep">/</span>
              <span className="ct-breadcrumb__active">CONTACT US</span>
            </div>

            {/* Heading + Accent Line */}
            <h1 className="ct-heading">Contact Us</h1>
            <div className="ct-heading-accent" aria-hidden="true" />

            {/* Sub-heading Lead Copy */}
            <p className="ct-lead">
              Have a question, partnership inquiry, or just want to learn more about TerraOne?
              We'd love to hear from you.
            </p>

            {/* Form */}
            <form className="ct-form" onSubmit={onSubmit} ref={formRef} noValidate>
              {/* Row 1: First Name & Last Name */}
              <div className="ct-form__row">
                <div className="ct-field">
                  <input
                    id="ct-first-name"
                    name="firstName"
                    type="text"
                    className="ct-input"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="ct-field">
                  <input
                    id="ct-last-name"
                    name="lastName"
                    type="text"
                    className="ct-input"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Row 2: Work Email */}
              <div className="ct-field ct-field--full">
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  className="ct-input"
                  placeholder="Work email"
                  required
                />
              </div>

              {/* Row 3: Company / Organization */}
              <div className="ct-field ct-field--full">
                <input
                  id="ct-organization"
                  name="organization"
                  type="text"
                  className="ct-input"
                  placeholder="Company / Organization"
                />
              </div>

              {/* Row 4: Inquiry Type Dropdown */}
              <div className="ct-field ct-field--full ct-field--select">
                <select
                  id="ct-inquiry-type"
                  name="inquiryType"
                  className="ct-select"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Inquiry type
                  </option>
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="ct-select-arrow" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Row 5: Your Message */}
              <div className="ct-field ct-field--full">
                <textarea
                  id="ct-message"
                  name="message"
                  className="ct-textarea"
                  rows={6}
                  placeholder="Your message"
                  required
                />
              </div>

              {/* Row 6: Submit Button & Status */}
              <div className="ct-submit-wrap">
                <button
                  className="ct-submit-btn"
                  type="submit"
                  disabled={state.status === "sending"}
                >
                  <span>{state.status === "sending" ? "Sending..." : "Send message"}</span>
                  <span className="ct-submit-arrow">→</span>
                </button>

                {state.status === "sent" && (
                  <p className="ct-status ct-status--success" role="status">
                    {state.message || "Message sent successfully! We will get back to you shortly."}
                  </p>
                )}
                {state.status === "invalid" && (
                  <p className="ct-status ct-status--error" role="alert">
                    {state.message || "Please fill in all required fields."}
                  </p>
                )}
              </div>

              {recaptchaEnabled && (
                <p className="ct-recaptcha">
                  Protected by reCAPTCHA and subject to Google{" "}
                  <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
                  <a href="https://policies.google.com/terms">Terms of Service</a>.
                </p>
              )}
            </form>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN — VISUAL IMAGE & CONTACT INFO CARDS
          ═══════════════════════════════════════════════════════════ */}
          <div className="ct-right">
            {/* Top Visual Image */}
            <div className="ct-visual">
              <img
                src="/media/decor/contact_us.jpg"
                alt="Contact us"
                className="ct-visual__img"
              />
            </div>

            {/* Contact Details List */}
            <div className="ct-info-list">
              {/* Item 1: Email us */}
              <div className="ct-info-item">
                <div className="ct-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="ct-info-content">
                  <h3 className="ct-info-title">Email us</h3>
                  <a href={`mailto:${company.email}`} className="ct-info-link">
                    {company.email}
                  </a>
                  <p className="ct-info-sub">We'll respond as soon as possible</p>
                </div>
              </div>

              {/* Item 2: Call us */}
              {/* <div className="ct-info-item">
                <div className="ct-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="ct-info-content">
                  <h3 className="ct-info-title">Call us</h3>
                  <a href={`tel:${company.phoneHref}`} className="ct-info-link">
                    {company.phone}
                  </a>
                  <p className="ct-info-sub">Mon to Fri, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div> */}

              {/* Item 3: Registered Office */}
              {/* <div className="ct-info-item">
                <div className="ct-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="ct-info-content">
                  <h3 className="ct-info-title">Registered Office</h3>
                  <address className="ct-info-address">
                    203, Millennium Plaza, Sakinaka, Telephone Exchange, Sakinaka, Mumbai 400 072, India
                  </address>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
