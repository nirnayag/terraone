import React, { useEffect, useState, useRef } from "react";
import "./TechHero.css";

/*
  Node positions are relative to .techhero-amoeba-group (400×420 px).
  The track ring sits at inset: -22px, so the track line is at:
    top edge:    y = -22px  → top: -22px
    bottom edge: y = 442px  → top: 442px  (or bottom: -22px)
    left edge:   x = -22px  → left: -22px
    right edge:  x = 422px  → left: 422px (or right: -22px)

  Each node uses transform: translate(-50%, -50%) so its CENTER
  sits exactly on the track line. Dragging adds an extra offset on top.
*/
const INITIAL_NODES = [
  {
    id: "leaf",
    name: "PHA",
    label: "Microbial Fermentation",
    // 12 o'clock — top center of track
    top: "-22px",
    left: "50%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21v-7" stroke="#16A34A" />
        <path d="M12 14c0-4 3.5-7 7.5-7 0 4-3.5 7-7.5 7z" stroke="#16A34A" />
        <path d="M12 17c0-3.2-2.8-5.8-6-5.8 0 3.2 2.8 5.8 6 5.8z" stroke="#16A34A" />
      </svg>
    ),
  },
  {
    id: "sprout",
    name: "PBAT",
    label: "Flexible Biopolymers",
    // ~2 o'clock — upper-right of track
    top: "20%",
    left: "422px",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" stroke="#16A34A" />
        <path d="M12 10C12 6 16 4 20 4C20 8 16 10 12 10Z" stroke="#16A34A" />
        <path d="M12 14C12 11 9 9 6 9C6 12 9 14 12 14Z" stroke="#16A34A" />
      </svg>
    ),
  },
  {
    id: "molecule",
    name: "PBS",
    label: "Molecular Synthetics",
    // ~4 o'clock — lower-right of track
    top: "75%",
    left: "422px",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.3" stroke="#0284C7" fill="none" />
        <circle cx="4.5" cy="18" r="2.3" stroke="#16A34A" fill="none" />
        <circle cx="19.5" cy="18" r="2.3" stroke="#0284C7" fill="none" />
        <line x1="10.3" y1="7" x2="6" y2="16" stroke="#16A34A" />
        <line x1="13.7" y1="7" x2="18" y2="16" stroke="#0284C7" />
        <line x1="6.8" y1="18" x2="17.2" y2="18" stroke="#0284C7" />
      </svg>
    ),
  },
  {
    id: "waves",
    name: "PLA",
    label: "Marine Biodegradable",
    // 6 o'clock — bottom center of track
    top: "442px",
    left: "50%",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8c2.5-2 5-2 7.5 0s5 2 7.5 0" stroke="#0284C7" />
        <path d="M3 13c2.5-2 5-2 7.5 0s5 2 7.5 0" stroke="#0284C7" />
        <path d="M3 18c2.5-2 5-2 7.5 0s5 2 7.5 0" stroke="#0284C7" />
      </svg>
    ),
  },
  {
    id: "tree",
    name: "Cellulose",
    label: "Plant Structure",
    // ~8 o'clock — lower-left of track
    top: "75%",
    left: "-22px",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-5" stroke="#16A34A" />
        <path d="M12 17c-3 0-5-2-5-5 0-1.8 1-3.3 2.5-4.2A5 5 0 0 1 12 3a5 5 0 0 1 2.5 4.8C16 8.7 17 10.2 17 12c0 3-2 5-5 5z" stroke="#16A34A" />
      </svg>
    ),
  },
  {
    id: "network",
    name: "TPS",
    label: "Polymer Network",
    // ~10 o'clock — upper-left of track
    top: "20%",
    left: "-22px",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.2" stroke="#16A34A" fill="none" />
        <circle cx="4" cy="12" r="2.2" stroke="#16A34A" fill="none" />
        <circle cx="20" cy="6" r="2.2" stroke="#16A34A" fill="none" />
        <circle cx="20" cy="18" r="2.2" stroke="#16A34A" fill="none" />
        <line x1="6.2" y1="12" x2="9.8" y2="12" stroke="#16A34A" />
        <line x1="14.2" y1="11" x2="18" y2="7.5" stroke="#16A34A" />
        <line x1="14.2" y1="13" x2="18" y2="16.5" stroke="#16A34A" />
      </svg>
    ),
  },
];

export default function TechHero({ activeIndex, onSelectNode }) {
  const [offsets, setOffsets] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.title = "Six biopolymer technologies, one goal — TerraOne";
  }, []);

  const handlePointerDown = (e, nodeId, index) => {
    e.preventDefault();
    setDraggingId(nodeId);
    const currentOffset = offsets[nodeId] || { x: 0, y: 0 };
    startPosRef.current = {
      x: e.clientX - currentOffset.x,
      y: e.clientY - currentOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    if (onSelectNode) onSelectNode(index);
  };

  const handlePointerMove = (e, nodeId) => {
    if (draggingId !== nodeId) return;
    const newX = e.clientX - startPosRef.current.x;
    const newY = e.clientY - startPosRef.current.y;
    setOffsets((prev) => ({
      ...prev,
      [nodeId]: { x: newX, y: newY },
    }));
  };

  const handlePointerUp = (e, nodeId) => {
    if (draggingId === nodeId) setDraggingId(null);
  };

  return (
    <section className="techhero-wrapper">
      <div className="shell">
        <div className="techhero-direct-container">
          <div className="techhero-grid">

            {/* ── Left Content Column ── */}
            <div className="techhero-content">
              <div className="techhero-eyebrow">
                <span className="techhero-badge" aria-hidden="true">
                  <span className="techhero-badge__dot" />
                </span>
                <span className="techhero-eyebrow__text">TECHNOLOGY</span>
              </div>

              <h1 className="techhero-title">
                Six biopolymer
                <br />
                technologies,
                <br />
                <span className="techhero-title__one">One</span>{" "}
                <span className="techhero-title__goal">goal</span>
              </h1>

              <p className="techhero-lede">
                Not all bioplastics are the same, and no single material is suitable for every application. We work across six core biopolymer technologies, each with a distinct origin, processing behaviour and biodegradation profile.
              </p>
            </div>

            {/* ── Right Orbital Visual ── */}
            <div className="techhero-visual">
              <div className="techhero-orb-container">

                {/* Dot grid decoration */}
                <svg className="techhero-dot-matrix" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                  <pattern id="dotPat" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="1.4" fill="#94A3B8" opacity="0.5" />
                  </pattern>
                  <rect width="120" height="120" fill="url(#dotPat)" />
                </svg>

                {/*
                  ── ONE animated group ──
                  amoebaMorph runs here ONCE.
                  Track ring, blob, AND icon nodes are all children →
                  they all ride the same morph as a single unit.
                */}
                <div className="techhero-amoeba-group">

                  {/* Track ring — overflows the group by 22px on each side */}
                  <div className="techhero-track-wrapper" aria-hidden="true">
                    <div className="techhero-track-ring techhero-track-ring--green">
                      <span className="techhero-track-dot techhero-track-dot--green" />
                    </div>
                    <div className="techhero-track-ring techhero-track-ring--blue">
                      <span className="techhero-track-dot techhero-track-dot--blue" />
                    </div>
                  </div>

                  {/* Blob — fills the group exactly */}
                  <div className="techhero-blob-frame">
                    <div className="techhero-blob-inner">
                      <img
                        src="/media/decor/biopolymer_molecule_3d_nature.png"
                        alt="3D Biopolymer Molecule in Nature"
                        className="techhero-molecule-img"
                      />
                    </div>
                  </div>

                  {/*
                    Icon nodes — INSIDE the group.
                    Positioned at the track ring edge (22px outside group boundary).
                    They ride the animation with the border and blob.
                  */}
                  <div className="techhero-nodes">
                    {INITIAL_NODES.map((node, index) => {
                      const isActive = activeIndex === index;
                      const isDragging = draggingId === node.id;
                      const offset = offsets[node.id] || { x: 0, y: 0 };

                      return (
                        <button
                          key={node.id}
                          type="button"
                          className={`techhero-node-btn${isActive ? " is-active" : ""}${isDragging ? " is-dragging" : ""}`}
                          style={{
                            top: node.top,
                            left: node.left,
                            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                          }}
                          onPointerDown={(e) => handlePointerDown(e, node.id, index)}
                          onPointerMove={(e) => handlePointerMove(e, node.id)}
                          onPointerUp={(e) => handlePointerUp(e, node.id)}
                          onPointerCancel={(e) => handlePointerUp(e, node.id)}
                          aria-label={`${node.name}: ${node.label}`}
                          title={`${node.name} — ${node.label} (drag to move)`}
                        >
                          <div className="techhero-node-btn__inner">
                            {node.icon}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                </div>{/* end .techhero-amoeba-group */}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
