/* WordPress post bodies arrive as rendered HTML carrying Elementor's inline
   styles and classes. Those bring colours from outside the TerraOne palette,
   so everything presentational is stripped and the remaining semantic markup
   is styled by our own stylesheet. Scripts and event handlers go too. */

const ALLOWED = new Set([
  "P", "BR", "STRONG", "B", "EM", "I", "U", "S", "SPAN",
  "H2", "H3", "H4", "H5", "H6",
  "UL", "OL", "LI", "BLOCKQUOTE", "PRE", "CODE",
  "A", "IMG", "FIGURE", "FIGCAPTION", "HR",
  "TABLE", "THEAD", "TBODY", "TR", "TH", "TD",
]);

const KEEP_ATTR = {
  A: ["href", "title"],
  IMG: ["src", "alt", "width", "height", "loading"],
};

export function sanitiseHtml(html = "") {
  if (typeof window === "undefined" || !html) return "";

  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild;

  const walk = (node) => {
    for (const child of [...node.children]) {
      walk(child);

      if (!ALLOWED.has(child.tagName)) {
        // keep the text, drop the wrapper
        child.replaceWith(...child.childNodes);
        continue;
      }

      const keep = KEEP_ATTR[child.tagName] ?? [];
      for (const attr of [...child.attributes]) {
        if (!keep.includes(attr.name.toLowerCase())) child.removeAttribute(attr.name);
      }

      if (child.tagName === "A") {
        const href = child.getAttribute("href") ?? "";
        if (/^javascript:/i.test(href)) child.removeAttribute("href");
        if (/^https?:\/\//i.test(href)) {
          child.setAttribute("target", "_blank");
          child.setAttribute("rel", "noopener noreferrer");
        }
      }

      if (child.tagName === "IMG") child.setAttribute("loading", "lazy");
    }
  };

  walk(root);
  return root.innerHTML;
}

export function readingTime(html = "") {
  const words = html.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
