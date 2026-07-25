/* =========================================================================
   TerraOne — "What we do"
   Vanilla JS only.

     1.  Helpers
     2.  Timeline rail — path built from measured card geometry
     3.  Decorative dotted swoosh
     4.  Carousel — arrows, dots, flow buttons
     5.  Entrance animation (IntersectionObserver)
     6.  Boot
   ========================================================================= */
(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const track = document.getElementById("track");
  const rail = document.querySelector(".timeline__rail");
  const deco = document.querySelector(".controls__deco");
  const dotsList = document.getElementById("dots");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (!track) return;

  const cards = [...track.children];

  /* ---------- 1. Helpers ---------- */
  const el = (name, attrs = {}) => {
    const node = document.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    return node;
  };

  const cssNum = (name, fallback) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : fallback;
  };

  const accentOf = (card) =>
    getComputedStyle(card).getPropertyValue("--accent").trim() || "#1b7fc4";

  const debounce = (fn, wait = 120) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  /* ---------- 2. Timeline rail ----------
     Each card owns one path: it rises out of the previous gap, runs along the
     top of its own card, and dives back down into the next gap, ending at that
     gap's midpoint. Consecutive paths therefore meet exactly at the midpoints,
     which is where the colour changes hands — so the rail reads as one
     continuous line rather than a set of separate brackets.

     Corners use quadratic curves with the control point on the corner itself,
     which keeps the radius visually circular without arc-flag arithmetic. */
  function drawRail() {
    rail.textContent = "";

    // the rail only makes sense once cards sit side by side
    if (window.innerWidth < 768 || cards.length < 2) return;

    const box = rail.getBoundingClientRect();
    const drop = cssNum("--rail-drop", 112);
    const dip = cssNum("--rail-dip", 150);
    const r = cssNum("--rail-r", 28);

    const railY = 1;
    const legY = drop;
    const dipY = dip - 1;

    const geo = cards.map((card) => {
      const b = card.getBoundingClientRect();
      return { left: b.left - box.left, right: b.right - box.left, accent: accentOf(card) };
    });

    const midAfter = (i) =>
      i < geo.length - 1 ? (geo[i].right + geo[i + 1].left) / 2 : null;

    geo.forEach((g, i) => {
      const startMid = i > 0 ? midAfter(i - 1) : null;
      const endMid = midAfter(i);
      const d = [];

      // --- entry: either a leg turning down, or a rise out of the last gap ---
      if (startMid === null) {
        d.push(`M ${g.left} ${legY}`, `L ${g.left} ${railY + r}`);
      } else {
        d.push(
          `M ${startMid} ${dipY}`,
          `L ${g.left - r} ${dipY}`,
          `Q ${g.left} ${dipY} ${g.left} ${dipY - r}`,
          `L ${g.left} ${railY + r}`,
        );
      }

      // --- across the top of this card ---
      d.push(
        `Q ${g.left} ${railY} ${g.left + r} ${railY}`,
        `L ${g.right - r} ${railY}`,
        `Q ${g.right} ${railY} ${g.right} ${railY + r}`,
      );

      // --- exit: dive into the next gap, or finish with a leg ---
      if (endMid === null) {
        d.push(`L ${g.right} ${legY}`);
      } else {
        d.push(
          `L ${g.right} ${dipY - r}`,
          `Q ${g.right} ${dipY} ${g.right + r} ${dipY}`,
          `L ${endMid} ${dipY}`,
        );
      }

      rail.appendChild(el("path", { d: d.join(" "), stroke: g.accent }));
    });

    // open node centred over each card
    geo.forEach((g) => {
      rail.appendChild(
        el("circle", { cx: (g.left + g.right) / 2, cy: railY, r: 11, stroke: g.accent }),
      );
    });
  }

  /* ---------- 3a. Decorative dot grid ---------- */
  function drawDotGrid() {
    const grid = document.querySelector(".dotgrid");
    if (!grid || grid.children.length) return;
    for (let i = 0; i < 12; i += 1) grid.appendChild(document.createElement("i"));
  }

  /* ---------- 3. Decorative dotted swoosh ---------- */
  function drawDeco() {
    if (!deco) return;
    deco.textContent = "";

    const w = deco.clientWidth || 760;
    const h = 120;
    deco.setAttribute("viewBox", `0 0 ${w} ${h}`);

    const rows = 3;
    const cols = Math.round(w / 22);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const t = col / (cols - 1);

        // a shallow trough, so dots crowd at the edges and thin out in the middle
        const curve = Math.sin(t * Math.PI);
        const x = t * w;
        const y = h * 0.34 + curve * 34 + row * 13;

        // fade out towards the centre, where the buttons sit
        const opacity = Math.max(0, 0.55 - curve * 0.5) * (1 - row * 0.22);
        if (opacity <= 0.04) continue;

        deco.appendChild(
          el("circle", {
            cx: x.toFixed(1),
            cy: y.toFixed(1),
            r: 2.4 - row * 0.35,
            opacity: opacity.toFixed(2),
          }),
        );
      }
    }
  }

  /* ---------- 4. Carousel ---------- */
  const state = { page: 0, pages: 1 };

  const perView = () => {
    const cardW = cards[0].getBoundingClientRect().width;
    return Math.max(1, Math.round(track.clientWidth / cardW));
  };

  const maxScroll = () => track.scrollWidth - track.clientWidth;

  function measurePages() {
    state.pages = Math.max(1, Math.ceil(cards.length / perView()));
  }

  function buildDots() {
    dotsList.textContent = "";
    for (let i = 0; i < state.pages; i += 1) {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Sector page ${i + 1} of ${state.pages}`);
      b.addEventListener("click", () => goTo(i));
      li.appendChild(b);
      dotsList.appendChild(li);
    }
    syncDots();
  }

  function syncDots() {
    [...dotsList.querySelectorAll("button")].forEach((b, i) =>
      b.setAttribute("aria-selected", String(i === state.page)),
    );
    prevBtn.disabled = state.page === 0;
    nextBtn.disabled = state.page >= state.pages - 1;
  }

  function goTo(page) {
    const clamped = Math.min(Math.max(page, 0), state.pages - 1);
    const step = state.pages > 1 ? maxScroll() / (state.pages - 1) : 0;
    track.scrollTo({ left: step * clamped, behavior: "smooth" });
  }

  function readScroll() {
    const max = maxScroll();
    state.page = max <= 0 ? 0 : Math.round((track.scrollLeft / max) * (state.pages - 1));
    syncDots();
  }

  prevBtn.addEventListener("click", () => goTo(state.page - 1));
  nextBtn.addEventListener("click", () => goTo(state.page + 1));

  // the arrow sitting between two cards advances by exactly one card
  document.querySelectorAll("[data-flow]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const w = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
      track.scrollBy({ left: w, behavior: "smooth" });
    });
  });

  track.addEventListener("scroll", () => {
    readScroll();
    drawRail();
  }, { passive: true });

  /* ---------- 5. Entrance animation ---------- */
  function observeReveals() {
    const targets = document.querySelectorAll(".reveal");
    targets.forEach((t) => {
      if (t.dataset.delay) t.style.setProperty("--reveal-delay", `${t.dataset.delay}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    targets.forEach((t) => io.observe(t));

    // cards slide up in sequence once the row scrolls into view
    const rowIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cards.forEach((card, i) => {
            card.style.setProperty("--reveal-delay", `${i * 90}ms`);
            card.classList.add("reveal", "is-visible");
          });
          rowIo.disconnect();
        });
      },
      { threshold: 0.08 },
    );
    rowIo.observe(track);
  }

  /* ---------- 6. Boot ---------- */
  function layout() {
    measurePages();
    buildDots();
    readScroll();
    drawDotGrid();
    drawRail();
    drawDeco();
  }

  const onResize = debounce(layout, 120);
  window.addEventListener("resize", onResize);

  // fonts change card height, which moves the rail
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  layout();
  observeReveals();
})();
