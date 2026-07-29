import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import "./Compounding.css";

/* Copy is still the placeholder written from Technologies.docx — no
   compounding document was supplied. The layout is the supplied design:
   six inputs converging on one compounded grade, then the six materials,
   the process that blends them, and the closing enquiry. */

/* ── palette ──────────────────────────────────────────────────────────────
   Six materials need six separable hues. Four come from the brand sheet;
   the teal on PBS and the violet on TPS come from the compounding design.
   `base` and `dark` are illustration-only. `text` is the one step of each
   hue that clears 4.5:1 on white, and is the only one type or a white glyph
   is ever set against. */
const TINTS = {
  pha: { light: "#C7E9A8", base: "#6DBE45", dark: "#3F7C25", text: "#3F7C25" },
  pbat: { light: "#B3E2F7", base: "#00A0E1", dark: "#00588F", text: "#00588F" },
  pla: { light: "#E2F2C4", base: "#8CC63F", dark: "#5F8C1F", text: "#55801B" },
  pbs: { light: "#B6EAEC", base: "#2FB9C7", dark: "#146A76", text: "#116069" },
  tps: { light: "#D6C8F0", base: "#8B6FD1", dark: "#4C3A87", text: "#4C3A87" },
  add: { light: "#F7F3E9", base: "#DED6C2", dark: "#9A9179", text: "#6C6555" },
};

const POLYMERS = [
  { key: "pha", code: "PHA", note: "Strength & barrier from nature.", to: "/technology" },
  { key: "pbat", code: "PBAT", note: "Toughness & flexibility.", to: "/technology" },
  { key: "pla", code: "PLA", note: "Rigidity & clarity.", to: "/technology" },
  { key: "pbs", code: "PBS", note: "Heat resistance & chemical durability.", to: "/technology" },
  { key: "tps", code: "TPS", note: "Versatility & cost efficiency.", to: "/technology" },
  { key: "add", code: "Additives", note: "Tailored performance multipliers.", to: "/contact" },
];

const STEPS = [
  { title: "Select & evaluate", body: "We evaluate each polymer and additive for your target application." },
  { title: "Formulate", body: "Our experts design the optimal blend to meet your performance goals." },
  { title: "Compound", body: "Precision compounding ensures uniformity and material integrity." },
  { title: "Test & validate", body: "Rigorously tested for mechanical, thermal and biodegradation performance." },
  { title: "Deliver", body: "Consistent, reliable and application-ready compounded material." },
  { title: "Your advantage", body: "Better performance. Lower trade-offs. Real impact." },
];

/* Figures as given in the design. Only the first is corroborated by the
   client's documents — the other three need confirming before launch. */
const FIGURES = [
  { icon: "leaf", figure: "6+", label: ["Polymer", "technologies"] },
  { icon: "flask", figure: "500+", label: ["Formulations", "developed"] },
  { icon: "target", figure: "10+", label: ["Industries", "served"] },
  { icon: "globe", figure: "25+", label: ["Countries", "reached"] },
];

/* ── pellet scatter ───────────────────────────────────────────────────────
   Seeded, so a re-render never reshuffles a pile that the eye has settled on. */
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Polar placement with a square-rooted radius fills the middle before the
   edge, which is how a poured pile actually sits. Painted back to front. */
function pile(seed, count, rx, ry, min, max) {
  const rand = prng(seed);
  return Array.from({ length: count }, () => {
    const angle = rand() * Math.PI * 2;
    const spread = Math.sqrt(rand());
    return {
      x: Math.cos(angle) * spread * rx,
      y: Math.sin(angle) * spread * ry,
      r: min + rand() * (max - min),
    };
  }).sort((a, b) => a.y - b.y);
}

function Pellets({ seed, count, rx, ry, min, max, tint, cx = 0, cy = 0 }) {
  return pile(seed, count, rx, ry, min, max).map((b, i) => (
    <circle key={i} cx={cx + b.x} cy={cy + b.y} r={b.r} fill={`url(#bead-${tint})`} />
  ));
}

/* Every gradient the page uses, defined once and referenced by fragment id
   from the inline SVGs below. */
function PaintDefs() {
  return (
    <svg className="cmp-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(TINTS).map(([key, t]) => (
          <radialGradient key={key} id={`bead-${key}`} cx="34%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="26%" stopColor={t.light} />
            <stop offset="72%" stopColor={t.base} />
            <stop offset="100%" stopColor={t.dark} />
          </radialGradient>
        ))}

        {Object.entries(TINTS).map(([key, t]) => (
          <linearGradient key={key} id={`flow-${key}`} x1="180" y1="0" x2="470" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={t.base} stopOpacity="0.1" />
            <stop offset="34%" stopColor={t.base} stopOpacity="0.8" />
            <stop offset="80%" stopColor={t.light} stopOpacity="0.5" />
            <stop offset="100%" stopColor={t.light} stopOpacity="0" />
          </linearGradient>
        ))}

        <radialGradient id="dish-glass" cx="36%" cy="24%" r="82%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="68%" stopColor="#eef4f6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#cbdadf" stopOpacity="0.92" />
        </radialGradient>

        <linearGradient id="rail-line" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6DBE45" />
          <stop offset="48%" stopColor="#2FB9C7" />
          <stop offset="100%" stopColor="#00A0E1" />
        </linearGradient>

        <linearGradient id="leaf-fill" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#A5D65C" />
          <stop offset="100%" stopColor="#3F7C25" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* The compounded result: a shallow dish of finished pellets. */
function Dish({ cx = 0, cy = 0, rx = 104, ry = 70, seed = 31, count = 150, tint = "add" }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + ry * 0.74} rx={rx * 0.8} ry={ry * 0.15} fill="#0E2A33" opacity="0.07" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#dish-glass)" />
      <Pellets
        seed={seed}
        count={count}
        rx={rx * 0.74}
        ry={ry * 0.5}
        min={rx * 0.031}
        max={rx * 0.053}
        tint={tint}
        cx={cx}
        cy={cy - ry * 0.05}
      />
      {/* the dish wall: a white rim over a hairline, read as glass */}
      <ellipse cx={cx} cy={cy} rx={rx * 0.9} ry={ry * 0.86} fill="none" stroke="#ffffff" strokeWidth={rx * 0.02} opacity="0.5" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#ffffff" strokeWidth={rx * 0.035} opacity="0.85" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#0E2A33" strokeWidth="1" opacity="0.16" />
      <path
        d={`M ${cx - rx * 0.74} ${cy - ry * 0.3} A ${rx * 0.82} ${ry * 0.82} 0 0 1 ${cx - rx * 0.12} ${cy - ry * 0.88}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={rx * 0.026}
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  );
}

/* ── hero diagram ─────────────────────────────────────────────────────────
   Six inputs, one output. The streams carry each material's colour until
   they reach the dish, where they give it up. */
const HERO_Y = [46, 116, 186, 256, 326, 400];

function HeroFlow() {
  return (
    <svg
      className="cmp-flow"
      viewBox="18 6 618 434"
      role="img"
      aria-label="Six biopolymer technologies — PHA, PBAT, PLA, PBS, TPS and additives — flowing together into one compounded grade"
    >
      <g className="cmp-flow__rings" aria-hidden="true">
        <circle cx="524" cy="222" r="128" />
        <circle cx="524" cy="222" r="172" />
        <circle cx="524" cy="222" r="216" />
      </g>

      {POLYMERS.map((p, i) => {
        const y = HERO_Y[i];
        const end = 214 + (i - 2.5) * 6;
        const d = `M 182 ${y} C 300 ${y}, 320 ${end}, 442 ${end}`;
        return (
          <g key={p.key}>
            <path d={d} fill="none" stroke={`url(#flow-${p.key})`} strokeWidth="18" strokeLinecap="round" opacity="0.4" />
            <path d={d} fill="none" stroke={`url(#flow-${p.key})`} strokeWidth="5" strokeLinecap="round" />
            <path
              className="cmp-flow__trail"
              style={{ animationDelay: `${i * -0.5}s` }}
              d={d}
              fill="none"
              stroke={`url(#flow-${p.key})`}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="1 18"
            />
          </g>
        );
      })}

      <Dish cx={524} cy={222} rx={104} ry={70} seed={31} count={165} />

      {POLYMERS.map((p, i) => {
        const y = HERO_Y[i];
        return (
          <g key={p.key}>
            <rect className="cmp-flow__chip" x="122" y={y - 28} width="58" height="56" rx="18" />
            <Pellets seed={9 + i * 13} count={26} rx={14} ry={12} min={2.4} max={4.3} tint={p.key} cx={151} cy={y} />
            <text className="cmp-flow__label" x="110" y={y} textAnchor="end" dominantBaseline="middle">
              {p.key === "add" ? (
                <>
                  <tspan x="110" dy="-0.5em">Other</tspan>
                  <tspan x="110" dy="1.15em">additives</tspan>
                </>
              ) : (
                p.code
              )}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── card illustrations ───────────────────────────────────────────────────
   One per material, so the row reads as six things rather than one thing
   recoloured six times. */
function ArtDish({ tint }) {
  return (
    <svg viewBox="0 0 200 112" aria-hidden="true">
      <Dish cx={100} cy={58} rx={52} ry={34} seed={5} count={78} tint={tint} />
    </svg>
  );
}

function ArtBubbles({ tint, seed, count, spread }) {
  const rand = prng(seed);
  return (
    <svg viewBox="0 0 200 112" aria-hidden="true">
      {pile(seed, count, spread, spread * 0.52, 5, 17).map((b, i) => (
        <circle key={i} cx={100 + b.x} cy={58 + b.y} r={b.r} fill={`url(#bead-${tint})`} opacity={0.75 + rand() * 0.25} />
      ))}
    </svg>
  );
}

function ArtStar({ tint }) {
  const rays = Array.from({ length: 11 }, (_, i) => {
    const a = (i / 11) * Math.PI * 2 + 0.3;
    const len = 30 + (i % 3) * 8;
    return { x: 100 + Math.cos(a) * len, y: 58 + Math.sin(a) * len * 0.82, r: 3.4 + (i % 3) };
  });
  return (
    <svg viewBox="0 0 200 112" aria-hidden="true">
      <g stroke={TINTS[tint].base} strokeWidth="2" strokeLinecap="round" opacity="0.6">
        {rays.map((p, i) => (
          <line key={i} x1="100" y1="58" x2={p.x} y2={p.y} />
        ))}
      </g>
      {rays.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={`url(#bead-${tint})`} />
      ))}
      <circle cx="100" cy="58" r="10" fill={`url(#bead-${tint})`} />
    </svg>
  );
}

function ArtMolecule({ tint }) {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: 100 + Math.cos(a) * 40, y: 58 + Math.sin(a) * 30, r: i % 2 ? 8 : 11 };
  });
  return (
    <svg viewBox="0 0 200 112" aria-hidden="true">
      <g stroke={TINTS[tint].base} strokeWidth="2.5" strokeLinecap="round" opacity="0.55">
        {nodes.map((n, i) => (
          <line key={i} x1={n.x} y1={n.y} x2={nodes[(i + 1) % 6].x} y2={nodes[(i + 1) % 6].y} />
        ))}
        {nodes.map((n, i) => (
          <line key={`s${i}`} x1="100" y1="58" x2={n.x} y2={n.y} opacity="0.5" />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={`url(#bead-${tint})`} />
      ))}
      <circle cx="100" cy="58" r="13" fill={`url(#bead-${tint})`} />
    </svg>
  );
}

function ArtHeap({ tint }) {
  return (
    <svg viewBox="0 0 200 112" aria-hidden="true">
      <ellipse cx="100" cy="84" rx="62" ry="7" fill="#0E2A33" opacity="0.06" />
      <Pellets seed={41} count={110} rx={58} ry={19} min={3} max={5} tint={tint} cx={100} cy={66} />
      <Pellets seed={97} count={46} rx={30} ry={11} min={3} max={5} tint={tint} cx={100} cy={50} />
    </svg>
  );
}

const ART = {
  pha: (t) => <ArtDish tint={t} />,
  pbat: (t) => <ArtBubbles tint={t} seed={23} count={16} spread={54} />,
  pla: (t) => <ArtStar tint={t} />,
  pbs: (t) => <ArtMolecule tint={t} />,
  tps: (t) => <ArtBubbles tint={t} seed={64} count={26} spread={46} />,
  add: (t) => <ArtHeap tint={t} />,
};

/* ── icons ────────────────────────────────────────────────────────────── */
const ico = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Search = () => (
  <svg {...ico}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.4 15.4 5.1 5.1" />
  </svg>
);

const Matrix = () => (
  <svg {...ico} strokeWidth="0" fill="currentColor">
    {[
      [12, 4], [8, 7], [16, 7], [5, 11], [12, 10.5], [19, 11],
      [8, 14.5], [16, 14.5], [12, 18], [6.5, 18.5], [17.5, 18.5],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1.1} />
    ))}
  </svg>
);

const Flask = () => (
  <svg {...ico}>
    <path d="M9.5 2.5h5" />
    <path d="M10.5 2.5v6.3L5.9 17a2.2 2.2 0 0 0 1.9 3.4h8.4A2.2 2.2 0 0 0 18.1 17l-4.6-8.2V2.5" />
    <path d="M8.1 14.6h7.8" />
  </svg>
);

const Clipboard = () => (
  <svg {...ico}>
    <path d="M8.5 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.5" />
    <rect x="8.5" y="2.2" width="7" height="3.6" rx="1.2" />
    <path d="m9.3 13.4 2.2 2.2 4-4.2" />
  </svg>
);

const Parcel = () => (
  <svg {...ico}>
    <path d="M3.5 7.4 12 3l8.5 4.4v9.2L12 21l-8.5-4.4z" />
    <path d="M3.5 7.4 12 11.9l8.5-4.5M12 11.9V21" />
    <path d="m7.7 5.2 8.6 4.5" />
  </svg>
);

const Sprout = () => (
  <svg {...ico}>
    <path d="M12 21v-7.4" />
    <path d="M12 13.6c0-3.9 3.2-7 7.1-7 0 3.9-3.2 7-7.1 7z" />
    <path d="M12 16.3c0-3.1-2.6-5.6-5.7-5.6 0 3.1 2.6 5.6 5.7 5.6z" />
  </svg>
);

const Target = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const Globe = () => (
  <svg {...ico}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M3.2 12h17.6" />
    <path d="M12 3.2a13.4 13.4 0 0 1 3.6 8.8A13.4 13.4 0 0 1 12 20.8 13.4 13.4 0 0 1 8.4 12 13.4 13.4 0 0 1 12 3.2z" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="#E2F2DA" />
    <path d="m6.2 10.3 2.6 2.6 5-5.4" stroke="#3F7C25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h11M10.5 5 15.5 10l-5 5" />
  </svg>
);

const STEP_ICONS = [Search, Matrix, Flask, Clipboard, Parcel, Sprout];
const FIGURE_ICONS = { leaf: Sprout, flask: Flask, target: Target, globe: Globe };

/* The rail behind the process nodes. Six equal columns put the node centres
   at 100, 300 … 1100 of a 1200-wide box, so the curve tracks them at any
   width once the box is stretched horizontally. */
const RAIL_D = [300, 500, 700, 900, 1100].reduce((d, x, i) => {
  const prev = [100, 300, 500, 700, 900][i];
  const bow = i % 2 ? 13 : -13;
  return `${d} C ${prev + 62} ${36 + bow}, ${x - 62} ${36 + bow}, ${x} 36`;
}, "M 100 36");

export default function Compounding() {
  const scope = useReveal();

  useEffect(() => {
    const previous = document.title;
    document.title = "Compounding — TerraOne";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="cmp" ref={scope}>
      <PaintDefs />

      {/* ---------- hero ---------- */}
      <section className="cmp-hero">
        <div className="shell cmp-hero__inner">
          <div className="cmp-hero__copy reveal">
            <p className="eyebrow cmp-hero__eyebrow">Compounding</p>
            <h1 className="cmp-hero__heading">
              Blends built for
              <br />
              the job in front of them
            </h1>
            <span className="cmp-rule" aria-hidden="true" />
            <p className="cmp-hero__lede">
              No single biopolymer is right for every application. Compounding is where the six
              technologies stop being separate materials and start being one specification.
            </p>
            <div className="cmp-hero__actions">
              <Link className="btn btn--fill" to="/contact">
                Start a material enquiry <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn--line" to="/technology">
                See the technologies
              </Link>
            </div>
          </div>

          <div className="cmp-hero__viz reveal">
            <HeroFlow />

            <div className="cmp-hero__result">
              <p className="cmp-hero__result-title">Engineered compounded solution</p>
              <ul className="cmp-hero__checks">
                <li>
                  <Check /> Balanced properties
                </li>
                <li>
                  <Check /> Consistent quality
                </li>
                <li>
                  <Check /> Application ready
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the six materials ---------- */}
      <section className="cmp-mats">
        <div className="shell">
          <header className="cmp-mats__head reveal">
            <h2 className="cmp-heading">Six technologies. Infinite possibilities.</h2>
            <span className="cmp-rule" aria-hidden="true" />
          </header>

          <ul className="cmp-mats__grid">
            {POLYMERS.map((p, i) => (
              <li
                className="cmp-card reveal"
                key={p.key}
                style={{
                  "--tint": TINTS[p.key].base,
                  "--tint-soft": TINTS[p.key].light,
                  "--tint-text": TINTS[p.key].text,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                {/* the whole card is the target; the arrow is just where it shows */}
                <Link className="cmp-card__link" to={p.to} aria-label={`${p.code} — ${p.note}`}>
                  <p className="cmp-card__num">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="cmp-card__code">{p.code}</h3>
                  <p className="cmp-card__note">{p.note}</p>
                  <span className="cmp-card__art">{ART[p.key](p.key)}</span>
                  <span className="cmp-card__go" aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="cmp-proc">
        <div className="shell">
          <div className="cmp-proc__panel reveal">
            <header className="cmp-proc__head">
              <h2 className="cmp-heading cmp-heading--sm">From materials to performance.</h2>
              <span className="cmp-rule" aria-hidden="true" />
            </header>

            <ol className="cmp-rail">
              <svg className="cmp-rail__line" viewBox="0 0 1200 72" preserveAspectRatio="none" aria-hidden="true">
                <path d={RAIL_D} fill="none" stroke="url(#rail-line)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>

              {STEPS.map((s, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li className="cmp-step" key={s.title}>
                    <p className="cmp-step__num">{String(i + 1).padStart(2, "0")}</p>
                    <span className="cmp-step__node" aria-hidden="true">
                      <Icon />
                    </span>
                    <h3 className="cmp-step__title">{s.title}</h3>
                    <p className="cmp-step__body">{s.body}</p>
                  </li>
                );
              })}
            </ol>

            <div className="cmp-proc__dish" aria-hidden="true">
              <svg viewBox="0 0 240 200">
                <Dish cx={118} cy={116} rx={98} ry={66} seed={13} count={140} />
                <g transform="translate(150 26) rotate(18)">
                  <path d="M0 46C0 20 24 0 62 2c2 30-22 50-62 44z" fill="url(#leaf-fill)" />
                  <path d="M4 45C18 30 38 16 60 6" fill="none" stroke="#ffffff" strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats figures ---------- */}
      <section className="cmp-stats">
        <div className="shell">
          <ul className="cmp-figures reveal">
            {FIGURES.map((f) => {
              const Icon = FIGURE_ICONS[f.icon];
              return (
                <li className="cmp-figure" key={f.figure}>
                  <span className="cmp-figure__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <p className="cmp-figure__value">{f.figure}</p>
                  <p className="cmp-figure__label">
                    {f.label[0]}
                    <br />
                    {f.label[1]}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section className="cmp-cta">
        <div className="shell">
          <div className="cmp-cta__panel reveal">
            <p className="cmp-cta__text">
              Bring us a specification
              <br />
              and we will tell you what it needs.
            </p>

            <div className="cmp-cta__actions">
              <Link className="btn btn--fill" to="/contact">
                Start a material enquiry <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn--line" to="/technology">
                See the technologies
              </Link>
            </div>

            <span className="cmp-cta__leaf" aria-hidden="true">
              <svg viewBox="0 0 220 150">
                <Pellets seed={53} count={44} rx={62} ry={13} min={3} max={5.4} tint="add" cx={120} cy={122} />
                <g transform="translate(28 14) rotate(-6)">
                  <path d="M2 96C2 44 46 4 122 8c4 60-44 100-120 88z" fill="url(#leaf-fill)" />
                  <path d="M8 94C34 66 74 36 118 16" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.55" strokeLinecap="round" />
                  <g stroke="#ffffff" strokeWidth="1.2" opacity="0.35" strokeLinecap="round">
                    <path d="M34 84C46 72 52 58 56 42" />
                    <path d="M58 70C70 58 78 46 84 32" />
                    <path d="M82 56C92 48 100 38 104 28" />
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
