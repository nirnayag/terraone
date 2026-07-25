/* Artwork for the biopolymer portfolio: molecular meshes, a glyph per polymer
   and the small trait icons. All drawn, so nothing is a bitmap and every
   colour comes from a token. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/* ---------- background mesh ---------- */
export function MoleculeMesh({ className }) {
  const cells = [];
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const x = col * 46 + (row % 2 ? 23 : 0);
      const y = row * 40;
      cells.push(
        <polygon key={`h${row}-${col}`} points="13,0 26,7.5 26,22.5 13,30 0,22.5 0,7.5" transform={`translate(${x} ${y})`} />,
      );
      cells.push(<circle key={`d${row}-${col}`} cx={x + 13} cy={y} r="2.4" className="mesh__dot" />);
    }
  }
  return (
    <svg className={className} viewBox="0 0 330 210" aria-hidden="true" focusable="false">
      {cells}
    </svg>
  );
}

/* ---------- one glyph per polymer ---------- */
function Ring({ n = 6 }) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [30 + Math.cos(a) * 22, 30 + Math.sin(a) * 22];
  });
  return (
    <svg viewBox="0 0 60 60" {...stroke}>
      <polygon points={pts.map((p) => p.join(",")).join(" ")} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

function Burst() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    return [30 + Math.cos(a) * 10, 30 + Math.sin(a) * 10, 30 + Math.cos(a) * 24, 30 + Math.sin(a) * 24];
  });
  return (
    <svg viewBox="0 0 60 60" {...stroke}>
      {rays.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray="1.5 4" />
      ))}
      <circle cx="30" cy="30" r="7" />
    </svg>
  );
}

function Strand() {
  return (
    <svg viewBox="0 0 60 60" {...stroke}>
      <path d="M20 6c14 10-14 20 0 30s-14 20 0 24" />
      <path d="M40 6c-14 10 14 20 0 30s14 20 0 24" />
      <path d="M21 14h18M20 26h20M21 38h18M22 50h16" strokeWidth="1.2" />
    </svg>
  );
}

function Web() {
  const nodes = [[30, 10], [48, 22], [46, 44], [30, 52], [14, 44], [12, 22], [30, 31]];
  return (
    <svg viewBox="0 0 60 60" {...stroke}>
      {nodes.slice(0, 6).map(([x, y], i) => (
        <line key={i} x1="30" y1="31" x2={x} y2={y} strokeWidth="1.1" />
      ))}
      <polygon points={nodes.slice(0, 6).map((p) => p.join(",")).join(" ")} strokeWidth="1.1" />
      {nodes.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r="2.6" fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}

export function PolymerGlyph({ code }) {
  if (code === "PBAT") return <Ring n={6} />;
  if (code === "PBS") return <Ring n={7} />;
  if (code === "PLA") return <Strand />;
  if (code === "Cellulose") return <Web />;
  return <Burst />; // TPS
}

/* ---------- trait / strip icons ---------- */
export function TraitIcon({ name }) {
  const k = String(name).toLowerCase();

  if (k.includes("marine") || k.includes("wave") || k.includes("water")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    );
  }
  if (k.includes("compost") || k.includes("recycle") || k.includes("degrade")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M7 6.5 4.5 11h5z" />
        <path d="M12.5 4.5 17 6.8l-2.5 4.4" />
        <path d="M19 13.5 16.5 18h-9" />
        <path d="M9.5 15.5 7 18l2.5 2.5" />
      </svg>
    );
  }
  if (k.includes("carbon")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M6.5 17a3.5 3.5 0 0 1 .4-7 5 5 0 0 1 9.6 1.3A3.2 3.2 0 0 1 17.5 17z" />
        <path d="M9 20.5h7" />
      </svg>
    );
  }
  if (k.includes("heat")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 14V5a2 2 0 0 1 4 0v9" />
        <circle cx="14" cy="17" r="3.2" />
        <path d="M8 8H5M8 12H5M8 16H5" />
      </svg>
    );
  }
  if (k.includes("durable") || k.includes("rigid")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3.5 20 6v6c0 4.4-3.3 7.9-8 8.5-4.7-.6-8-4.1-8-8.5V6z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </svg>
    );
  }
  if (k.includes("food") || k.includes("safe")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M7 3v7a2.5 2.5 0 0 0 5 0V3" />
        <path d="M9.5 10v11" />
        <path d="M17 3c-1.6 1.4-2.5 3.4-2.5 5.6V13h4V3z" />
      </svg>
    );
  }
  if (k.includes("dna") || k.includes("tech")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M8 3c6 4-6 8 0 12s-6 5 0 6" />
        <path d="M16 3c-6 4 6 8 0 12s6 5 0 6" />
        <path d="M9 7h6M8 13h8M9.5 18h5" strokeWidth="1.2" />
      </svg>
    );
  }
  if (k.includes("molecule") || k.includes("renewable") || k.includes("abundant")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="6" r="2.2" />
        <circle cx="5.5" cy="16" r="2.2" />
        <circle cx="18.5" cy="16" r="2.2" />
        <path d="M11 8 6.8 14M13 8l4.2 6M7.7 16h8.6" />
      </svg>
    );
  }
  if (k.includes("cube") || k.includes("versatile") || k.includes("applications")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5z" />
        <path d="m4 7.5 8 4 8-4M12 11.5V20" />
      </svg>
    );
  }
  if (k.includes("flexible") || k.includes("film") || k.includes("blend") || k.includes("barrier")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 8c4-3 12 3 16 0v8c-4 3-12-3-16 0z" />
      </svg>
    );
  }
  if (k.includes("cost")) {
    return (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v9M9.8 9.8h4.4M9.8 14.2h4.4" />
      </svg>
    );
  }
  // bio-based / default
  return (
    <svg viewBox="0 0 24 24" {...stroke}>
      <path d="M12 21v-7" />
      <path d="M12 14c0-4 3.2-7 7-7 0 4-3.2 7-7 7z" />
      <path d="M12 17c0-3.1-2.6-5.6-5.7-5.6 0 3.1 2.6 5.6 5.7 5.6z" />
    </svg>
  );
}
