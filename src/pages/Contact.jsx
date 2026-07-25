import { useRef, useState } from "react";
import { submitEnquiry } from "../lib/cf7";
import { getToken, recaptchaEnabled } from "../lib/recaptcha";
import { company } from "../data/content";
import PageHead from "../components/PageHead";
import "./Contact.css";

const TOPICS = [
  "Material or grade enquiry",
  "Compounding and blends",
  "Partnership or collaboration",
  "Investor enquiry",
  "Career",
  "Something else",
];

export default function Contact() {
  const [state, setState] = useState({ status: "idle", message: "", fields: {} });
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.status === "sending") return;

    const f = new FormData(e.currentTarget);
    setState({ status: "sending", message: "", fields: {} });

    try {
      const volume = f.get("volume")?.toString().trim();
      const recaptchaToken = await getToken("contact_enquiry");
      const result = await submitEnquiry({
        recaptchaToken,
        name: f.get("name"),
        email: f.get("email"),
        phone: f.get("phone"),
        subject: f.get("topic"),
        // the live form has no volume field, so it rides along in the message
        message: volume
          ? `${f.get("message")}\n\nVolume / timeline: ${volume}`
          : f.get("message"),
      });

      if (result.ok) {
        formRef.current?.reset();
        setState({ status: "sent", message: result.message, fields: {} });
      } else if (result.status === "validation_failed") {
        setState({
          status: "invalid",
          message: result.message || "Please check the highlighted fields.",
          fields: result.invalidFields,
        });
      } else {
        /* spam / mail_failed / aborted — nothing the visitor can fix by
           editing the form, so send them to email rather than leaving them
           retrying. `spam` is what CF7 returns if reCAPTCHA gets switched on
           in WordPress without this form sending a token. */
        setState({ status: "error", message: "", fields: {} });
      }
    } catch {
      setState({
        status: "error",
        message: "",
        fields: {},
      });
    }
  };

  const err = (key) => state.fields[key];

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Talk to us"
        lede="Tell us the application, the volume and the performance envelope you need. We will route you to the right grade — or say plainly if PHA is the wrong material for the job."
      />

      <section className="band band--tight">
        <div className="shell contact__layout">
          <form className="contact__form" onSubmit={onSubmit} ref={formRef} noValidate>
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-invalid={!!err("name")}
                aria-describedby={err("name") ? "e-name" : undefined}
              />
              {err("name") && (
                <p className="field__error" id="e-name">
                  {err("name")}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-invalid={!!err("email")}
                aria-describedby={err("email") ? "e-email" : undefined}
              />
              {err("email") && (
                <p className="field__error" id="e-email">
                  {err("email")}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-phone">Phone</label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                aria-invalid={!!err("phone")}
                aria-describedby={err("phone") ? "e-phone" : undefined}
              />
              {err("phone") && (
                <p className="field__error" id="e-phone">
                  {err("phone")}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-topic">What is this about?</label>
              <select id="c-topic" name="topic" defaultValue={TOPICS[0]}>
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="field field--wide">
              <label htmlFor="c-volume">Volume and timeline</label>
              <input
                id="c-volume"
                name="volume"
                type="text"
                placeholder="e.g. 2 tonnes, trial in Q3"
              />
              <p className="field__hint">Optional, but it lets us answer properly first time.</p>
            </div>

            <div className="field field--wide">
              <label htmlFor="c-message">Your message</label>
              <textarea
                id="c-message"
                name="message"
                rows="6"
                required
                aria-invalid={!!err("message")}
                aria-describedby={err("message") ? "e-message" : undefined}
              />
              {err("message") && (
                <p className="field__error" id="e-message">
                  {err("message")}
                </p>
              )}
            </div>

            <div className="contact__submit">
              <button className="btn btn--fill" type="submit" disabled={state.status === "sending"}>
                {state.status === "sending" ? "Sending…" : "Send enquiry"}
              </button>

              <p
                className={`contact__note contact__note--${state.status}`}
                role="status"
                aria-live="polite"
              >
                {state.status === "sent" &&
                  (state.message || "Thanks — your enquiry is with us and we'll reply shortly.")}
                {state.status === "invalid" && state.message}
                {state.status === "error" && (
                  <>
                    We couldn't send that. Email{" "}
                    <a href={`mailto:${company.email}`}>{company.email}</a> and we'll pick it up
                    there.
                  </>
                )}
              </p>
            </div>

            {/* Google's terms require this wording when the badge is hidden,
                and the badge is hidden because it carries Google's own brand
                colours, which are not in the TerraOne palette. */}
            {recaptchaEnabled && (
              <p className="contact__recaptcha field--wide">
                Protected by reCAPTCHA. The Google{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            )}
          </form>

          <aside className="contact__aside">
            <div className="contact__card">
              <p className="contact__key">Registered office</p>
              <address>{company.address}</address>
            </div>
            <div className="contact__card">
              <p className="contact__key">Phone</p>
              <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
            </div>
            <div className="contact__card">
              <p className="contact__key">Email</p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
