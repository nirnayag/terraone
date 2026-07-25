/* Decorative artwork for the proof-point band. All of it is inline SVG so it
   scales, stays crisp and carries no image weight — and so every colour comes
   from a token rather than being baked into a bitmap. */

export function Globe() {
  return (
    <svg className="statsband__globe" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="sb-globe-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.15" fill="currentColor" />
        </pattern>
        <radialGradient id="sb-globe-fade" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
        </radialGradient>
        <mask id="sb-globe-mask">
          <circle cx="160" cy="150" r="104" fill="url(#sb-globe-fade)" />
        </mask>
      </defs>

      {/* the sphere, built from a dot field */}
      <g mask="url(#sb-globe-mask)">
        <circle cx="160" cy="150" r="104" fill="url(#sb-globe-dots)" />
      </g>

      {/* landmass suggestion — a denser patch of dots */}
      <g mask="url(#sb-globe-mask)" opacity="0.85">
        <ellipse cx="132" cy="120" rx="42" ry="30" fill="url(#sb-globe-dots)" />
        <ellipse cx="188" cy="176" rx="46" ry="34" fill="url(#sb-globe-dots)" />
      </g>

      {/* orbital rings */}
      <ellipse
        className="statsband__orbit statsband__orbit--blue"
        cx="160"
        cy="150"
        rx="150"
        ry="58"
        transform="rotate(-24 160 150)"
      />
      <ellipse
        className="statsband__orbit statsband__orbit--green"
        cx="160"
        cy="150"
        rx="142"
        ry="70"
        transform="rotate(18 160 150)"
      />

      <circle className="statsband__orbit-pip statsband__orbit-pip--blue" cx="292" cy="96" r="5" />
      <circle className="statsband__orbit-pip statsband__orbit-pip--green" cx="36" cy="214" r="5" />
      <circle className="statsband__orbit-pip statsband__orbit-pip--blue" cx="150" cy="266" r="4" />
    </svg>
  );
}

export function Waves() {
  // stacked parallel curves, fanning out to the right
  const lines = Array.from({ length: 14 }, (_, i) => {
    const o = i * 7;
    return `M0 ${60 + o} C 90 ${10 + o}, 200 ${120 + o}, 320 ${44 + o} S 460 ${8 + o}, 520 ${70 + o}`;
  });

  return (
    <svg className="statsband__waves" viewBox="0 0 520 200" aria-hidden="true" focusable="false">
      {lines.map((d, i) => (
        <path key={i} d={d} className={i % 2 ? "is-green" : "is-blue"} />
      ))}
    </svg>
  );
}

export function Halftone({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 160" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="sb-halftone" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        </pattern>
        <radialGradient id="sb-halftone-fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="sb-halftone-mask">
          <rect width="160" height="160" fill="url(#sb-halftone-fade)" />
        </mask>
      </defs>
      <rect width="160" height="160" fill="url(#sb-halftone)" mask="url(#sb-halftone-mask)" />
    </svg>
  );
}

/* ---------- per-card footers ---------- */

function HexMesh() {
  const cells = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const x = col * 26 + (row % 2 ? 13 : 0);
      const y = row * 22;
      cells.push(
        <polygon key={`${row}-${col}`} points="15,0 30,8 30,24 15,32 0,24 0,8" transform={`translate(${x} ${y})`} />,
      );
    }
  }
  return (
    <svg className="stat__art" viewBox="0 0 240 96" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g>{cells}</g>
    </svg>
  );
}

function WaveArt() {
  const lines = Array.from(
    { length: 11 },
    (_, i) => `M0 ${70 - i * 4} C 60 ${34 - i * 4}, 140 ${96 - i * 4}, 240 ${40 - i * 4}`,
  );
  return (
    <svg className="stat__art" viewBox="0 0 240 96" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {lines.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function DotArt() {
  const dots = [];
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 22; col += 1) {
      // thin out towards the top so it fades into the card
      const r = 2.4 - row * 0.12;
      dots.push(<circle key={`${row}-${col}`} cx={col * 11 + 5} cy={row * 12 + 8} r={r} />);
    }
  }
  return (
    <svg className="stat__art" viewBox="0 0 240 96" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {dots}
    </svg>
  );
}

/* eslint-disable-next-line react-refresh/only-export-components */
export const cardArt = [HexMesh, WaveArt, WaveArt, DotArt];
