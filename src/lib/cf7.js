/* Contact Form 7 submission.

   The existing WordPress install runs CF7 6.1.6, and its REST namespace
   accepts a cross-origin POST (preflight returns Access-Control-Allow-Origin
   and allows POST + Content-Type). So the enquiry form submits for real
   rather than composing a mail draft.

   Field names below are the ones the live form at /contact-us/ declares —
   changing them in WordPress will silently break this, because CF7 answers an
   unknown field with validation_failed rather than an error. */

export const CF7_FORM_ID = import.meta.env.VITE_CF7_FORM_ID ?? "5";

const WP_ORIGIN = (import.meta.env.VITE_WP_BASE ?? "https://terrapha.com/wp-json").replace(
  /\/$/,
  "",
);

/* Hidden fields CF7 expects alongside the visible ones. The unit tag and
   container post identify which rendered instance of the form is posting. */
const META = {
  _wpcf7: CF7_FORM_ID,
  _wpcf7_version: "6.1.6",
  _wpcf7_locale: "en_US",
  _wpcf7_unit_tag: `wpcf7-f${CF7_FORM_ID}-p27619-o1`,
  _wpcf7_container_post: "27619",
  _wpcf7_posted_data_hash: "",
};

/**
 * @returns {Promise<{ok: boolean, message: string, invalidFields: Record<string,string>}>}
 */
export async function submitEnquiry({ name, email, phone, subject, message, recaptchaToken }) {
  const body = new FormData();
  for (const [k, v] of Object.entries(META)) body.append(k, v);
  body.append("your-name", name);
  body.append("your-email", email);
  body.append("phone", phone);
  body.append("subject", subject);
  body.append("your-message", message);

  // only sent when a site key is configured; CF7 ignores it otherwise
  if (recaptchaToken) {
    body.append("_wpcf7_recaptcha_response", recaptchaToken);
    body.append("g-recaptcha-response", recaptchaToken);
  }

  const res = await fetch(
    `${WP_ORIGIN}/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
    { method: "POST", body },
  );

  if (!res.ok && res.status !== 400) {
    throw new Error(`Contact form returned ${res.status}`);
  }

  const data = await res.json();

  // CF7 reports per-field problems rather than a single error
  const invalidFields = {};
  for (const f of data.invalid_fields ?? []) {
    const key = (f.field ?? "").replace(/^your-/, "");
    if (key) invalidFields[key] = f.message;
  }

  return {
    ok: data.status === "mail_sent",
    status: data.status,
    message: data.message ?? "",
    invalidFields,
  };
}
