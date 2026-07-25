# TerraOne

Marketing site for TerraOne, built with React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Structure

```
src/
  data/content.js        static page copy, in one place
  data/legal.js          privacy policy + terms, extracted from the .docx
  lib/wp.js              WordPress REST client (products, posts, media)
  lib/sanitise.js        strips imported HTML back to semantic markup
  hooks/useResource.js   async loader with loading / error / stale-response handling
  hooks/useReveal.js     scroll-entrance observer
  components/            shared UI — one .jsx + one .css each
  pages/                 one component per route
  styles/theme.css       the brand colour theme as CSS custom properties
  styles/global.css      reset, type scale, shared primitives (.btn, .eyebrow, .band …)
public/media/            web-optimised images, brand film, logo
assets-src/              original client files (source PNGs, .docx, master video)
```

Static copy lives in [content.js](src/data/content.js), not in the components —
the sections read from it, so editing text never means touching layout. Every
string there is transcribed from the client's `Home Page Content.docx`,
`Technologies.docx` and `Application page content.docx`. The legal pages are
extracted verbatim from `Privacy policy_Terms of use_TerraOne.docx`.

## The homepage

Section order follows the live terrapha.com homepage:

1. Brand film
2. Positioning statement + **sector card carousel** (10 cards, scroll-snap)
3. **Stats band** — "Built for global industries", four figures on the ink
4. **Why choose TerraOne** — problem statements (10) then solution statements (10)
5. **Biopolymer portfolio** — PHA feature card plus the five comparison polymers
6. Latest blogs

Contrast, Process, Research and the FAQ sit between 5 and 6. They carry copy
from the client's documents that the reference homepage has no slot for, so
they were kept rather than dropped.

Two things in the reference could not be reproduced literally, because they
use colours outside the palette:

- The portfolio section's **cream background** became `--to-green-10`.
- The **red ✕** on problem statements became slate, against green for
  solutions. The block headings say which is which, so colour is never the
  only signal.

The earlier sector index component was removed when this landed — the carousel
and the problem/solution grids now carry that content, and keeping it would
have put the same ten sectors on the page three times.

## Routes

| Route | Source |
|---|---|
| `/` | static |
| `/application` | `Application page content.docx` |
| `/technology` | `Technologies.docx` |
| `/compounding` `/investors` `/career` `/collaboration` | **placeholder copy** — see below |
| `/who-we-are` | `Home Page Content.docx` |
| `/products` `/products/:slug` | live WordPress API |
| `/blogs` `/blogs/:slug` | live WordPress API |
| `/contact` | static (form composes a mail draft) |
| `/privacy-policy` `/terms-of-use` | `Privacy policy_Terms of use_TerraOne.docx` |
| anything else | 404 |

Client-side routing means the host must rewrite unknown paths to `index.html`,
or deep links will 404. `vite dev` and `vite preview` already do, and
[public/_redirects](public/_redirects) covers Netlify. On Vercel add a
catch-all rewrite; on Apache/nginx, `try_files $uri /index.html`.

### Legacy URLs

The WordPress site uses different paths, so these are kept working:

| Existing URL | Goes to |
|---|---|
| `/product/{slug}/` | `/products/{slug}` |
| `/{post-slug}/` (posts are at the site root, no prefix) | `/blogs/{slug}` |
| `/about-us/` · `/technologies/` · `/contact-us/` · `/home-new/` | the matching new route |

Root-level post slugs are resolved by
[LegacyRedirect.jsx](src/pages/LegacyRedirect.jsx): an unmatched
single-segment path is looked up against the post slugs, and only becomes a
404 if there is no match.

**This is a safety net for people following old links, not an SEO fix.** A
client-side redirect passes no ranking signal. If this replaces terrapha.com,
the 92 indexed post URLs and 24 product URLs need real **301s at the host**.

## Live content

Products and posts come from the existing WordPress install at
`terrapha.com/wp-json`. Point [wp.js](src/lib/wp.js) elsewhere with
`VITE_WP_BASE` when the API moves.

Two things about that API drove the design of the client:

- **The WooCommerce Store API can't be used.** `wc/store/v1` sends no
  `Access-Control-Allow-Origin` header, so the browser blocks it. Products come
  from `wp/v2/product` instead, which does send CORS headers and carries the
  same 24 items.
- **The host is slow and its default payloads are huge.** A product listing
  with `_embed` was ~190 KB and took ~8s. Listings now request named fields
  only and never `content.rendered`; the product listing joins categories and
  media from separate small requests; responses are cached for the session.
  Cards paint at ~2.2s and images fill in behind them.

Originals in the media library are ~1 MB PNGs, so listings always use the
`medium` size — 24 product cards went from 25 MB to 0.9 MB. Note that
`_fields=media_details.sizes` returns nothing; WordPress ignores `_fields`
paths below `media_details`, so it has to be requested whole.

Imported HTML is stripped by [sanitise.js](src/lib/sanitise.js) before it
renders. Elementor ships inline styles and classes that would drag in colours
from outside the palette, so everything presentational is removed and the
remaining semantic markup is styled by our own stylesheet.

## The contact form

[Contact.jsx](src/pages/Contact.jsx) submits to the live Contact Form 7
install via [cf7.js](src/lib/cf7.js) — CF7's REST namespace accepts a
cross-origin POST, so enquiries reach the same inbox as the current site.
Field-level errors come back from CF7 and are shown against the inputs.

Form id `5` and the field names (`your-name`, `your-email`, `phone`,
`subject`, `your-message`) are read from the live form. **Renaming a field in
WordPress will silently break this** — CF7 answers an unknown field with
`validation_failed` rather than an error. Override with `VITE_CF7_FORM_ID`.

Verified as far as is possible without emailing the client: a deliberately
empty submission returns `validation_failed` with all five fields recognised,
which confirms CORS, the endpoint and the response shape. **A successful
`mail_sent` has not been exercised** — that needs one real submission.

### Spam / reCAPTCHA — read before enabling

reCAPTCHA v3 support is built ([recaptcha.js](src/lib/recaptcha.js)) but
**switched off**. With no `VITE_RECAPTCHA_SITE_KEY` the Google script is never
loaded, no token is sent, and nothing calls Google at all — verified.

> ⚠️ **The two switches must be flipped together.** CF7 verifies the reCAPTCHA
> token as a spam check. If you enable reCAPTCHA in CF7's integration settings
> while this key is blank, every enquiry from this site returns
> `status: "spam"` and never reaches the inbox — and it fails *silently*,
> because the WordPress form keeps working fine, so wp-admin looks healthy.
>
> The reverse order is safe: a token CF7 isn't checking is just ignored. So
> set `VITE_RECAPTCHA_SITE_KEY` and deploy **first**, then enable it in CF7.

To turn it on:

1. Get a **reCAPTCHA v3** key pair (not v2) from Google.
2. Set `VITE_RECAPTCHA_SITE_KEY` here and deploy.
3. Enter the same site key plus the secret in wp-admin under
   Contact → Integration → reCAPTCHA.
4. Submit a test enquiry and confirm it arrives.

The v3 badge is hidden, because it carries Google's brand colours and nothing
outside the palette may render. Google's terms allow this as long as the
attribution text is shown instead, which the form does whenever a key is set.

Note that a captcha on this form does not protect the CF7 endpoint itself —
a bot can still POST to it directly. Only a server-side check (CF7's own
reCAPTCHA, or Akismet) covers that. Entries are stored by Flamingo either way,
so spam is visible rather than silently lost.

## The colour theme

[theme.css](src/styles/theme.css) uses the Approved tints from the TerraOne
colour sheet:

- Blue: `#00A0E1`, `#33B3E7`, `#66C6ED`, `#99D9F3`, `#CCECF9`, `#E6F6FC`
- Green: `#6DBE45`, `#8ACB6A`, `#A7D88F`, `#C5E5B5`, `#E2F2DA`, `#F0F8EC`

Support tokens are aliases back to those approved tints only.

**No colour outside the sheet is used anywhere.** Every value lives in
[theme.css](src/styles/theme.css); component stylesheets only reference tokens,
so there are no hex literals, `color-mix()`, or `rgba()` calls outside that one
file. Verified by walking the rendered DOM and checking every computed
`color`, `background-color`, `border-color`, `outline-color` and
`text-decoration-color` against the 19 published values.

Two rules from the contrast table shape where colours may go:

- Bright blue and green fail as text on paper, so neither is ever set as text
  there. Blue appears only as a button fill; Deep Water carries links.
- The table certifies both primaries against the **ink** only — green on Deep
  Water is 2.2:1. So raised panels on dark sections stay ink, and Deep Water
  carries the rules and borders that separate them. Outline buttons on ink use
  the bright blue (5.1:1), since Deep Water on ink is 2.96:1, under the 3:1 a
  control outline needs.

## Type

- **Archivo** (variable, expanded widths) — display
- **Inter Tight** — body
- **IBM Plex Mono** — labels, spec data, counts

Loaded from Google Fonts in [index.html](index.html). Self-host before launch if
you want to drop the third-party request.

## Placeholder copy — replace before launch

No source document was supplied for four pages, so the copy is written from
facts that do appear in the supplied documents. Each file carries a comment
saying so.

- [Compounding.jsx](src/pages/Compounding.jsx) — written from the blending
  behaviour described in `Technologies.docx`.
- [Investors.jsx](src/pages/Investors.jsx) — every claim comes from
  `Home Page Content.docx`. **No funding, revenue, valuation or headcount
  figures have been invented.**
- [Career.jsx](src/pages/Career.jsx) — deliberately claims no specific
  vacancies, headcount or benefits.
- [Collaboration.jsx](src/pages/Collaboration.jsx).

## Other notes for the next pass

- The newsletter form in [Footer.jsx](src/components/Footer.jsx) has no
  endpoint to post to: MC4WP (Mailchimp) is installed on the WordPress side
  but **deactivated**. It hands the address over by email rather than showing
  a success message for something that did not happen. Activate a provider and
  give it a real endpoint. The contact form is wired to Contact Form 7 (above).

## Content deliberately not used

The WordPress install exposes `cpt_testimonials`, `cpt_services`, `cpt_team`
and `cpt_portfolio`. None of it is wired in, on purpose:

- **Testimonials and Services are theme-demo Lorem Ipsum.** The three
  testimonials are "Jennifer Lewis", "Janice Moore" and "Laura Richi" with
  `Consectetur adipiscing elit…` bodies; the services carry real-looking
  titles over `Mauris eu nisi eget nisi imperdiet vestibulum…`. They are
  leftovers from the Lab theme demo, in the same category as the draft pages
  named `Online Pharmacy` and `Typography` — they should be deleted, not
  published.
- **Team and Portfolio return 0 items publicly.** An authenticated audit
  counts 6 and 30, but those are drafts.

No testimonial section is included anywhere in this build. Attributed quotes
from named people have to come from real customers who agreed to be quoted.
- Products are enquiry-only by design: WooCommerce has every item at price `0`
  and Cash on Delivery as the only payment method, so there is no cart or
  checkout in this build. Adding one means a payment gateway first.
- The nav keeps the five items and the order specified in
  `Home Page Content.docx`, with Products and Blogs appended. Career,
  Collaboration and Contact live in the menu sheet and the footer. The live
  terrapha.com nav is different — worth confirming which is intended.
- Personal Care reuses the Cosmetics photograph — it is the one sector with no
  supplied image.
- Media in `public/media/` was generated from `assets-src/`: the hero film is
  the full brand video re-encoded (124 MB → 13 MB) and sector photos are
  cropped to 4:3 at 1200px.
- Products are enquiry-only: every item in WooCommerce has a price of `0`, so
  the detail page asks for an enquiry rather than showing a price.
- The WordPress REST API is currently readable without authentication. That is
  what makes this site possible, but it also lets anyone enumerate the whole
  catalogue and post list. Worth a deliberate decision rather than a default.
