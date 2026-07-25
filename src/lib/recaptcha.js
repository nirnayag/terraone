/* reCAPTCHA v3 for the Contact Form 7 submission.

   Inert unless VITE_RECAPTCHA_SITE_KEY is set. With no key the script is
   never loaded, getToken() returns null, and no token field is sent — which
   is exactly today's behaviour.

   IMPORTANT: this switch and CF7's own reCAPTCHA integration must be turned
   on together. CF7 verifies the token as a spam check, so if WordPress has
   reCAPTCHA enabled and this key is missing, every submission from this site
   comes back status: "spam" and never reaches the inbox. The reverse is
   harmless — a token CF7 isn't checking is simply ignored. */

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

export const recaptchaEnabled = Boolean(SITE_KEY);

let loader = null;

function loadScript() {
  if (loader) return loader;

  loader = new Promise((resolve, reject) => {
    if (window.grecaptcha?.execute) return resolve(window.grecaptcha);

    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
    s.async = true;
    s.onload = () => {
      if (window.grecaptcha?.ready) window.grecaptcha.ready(() => resolve(window.grecaptcha));
      else reject(new Error("grecaptcha unavailable after load"));
    };
    s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
    document.head.appendChild(s);
  });

  loader.catch(() => {
    loader = null; // let a later attempt retry
  });

  return loader;
}

/**
 * Resolves to a token, or null when reCAPTCHA is not configured or fails.
 * Never throws — a captcha problem must not block a legitimate enquiry
 * before CF7 has even seen it.
 */
export async function getToken(action = "contact") {
  if (!recaptchaEnabled) return null;
  try {
    const grecaptcha = await loadScript();
    return await grecaptcha.execute(SITE_KEY, { action });
  } catch {
    return null;
  }
}
