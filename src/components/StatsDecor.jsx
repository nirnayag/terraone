/* Decorative artwork for the proof-point band. All of it is inline SVG so it
   scales, stays crisp and carries no image weight — and so every colour comes
   from a token rather than being baked into a bitmap. */

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
