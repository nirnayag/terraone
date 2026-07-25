import { useCallback, useLayoutEffect, useRef, useState } from "react";

/* Builds the connector rail that runs across the top of the sector cards.

   The rail is NOT part of any card. It is one SVG layer sitting above the row,
   and its geometry is measured from the cards themselves — so it follows their
   width at any viewport size instead of depending on hardcoded numbers that
   have to be kept in sync with the CSS.

   Each card contributes one path: it rises out of the previous gap, runs along
   the top of its own card, and dives back into the next gap, stopping at that
   gap's midpoint. Consecutive paths therefore meet exactly at the midpoints,
   which is also where the colour changes hands — so the run reads as a single
   unbroken line rather than a set of brackets butted together.

   Corners are quadratic curves with the control point on the corner itself,
   which gives a true radius without arc-flag arithmetic. */

const RAIL_Y = 14; // where the rail sits inside the svg
const DIP_BELOW = 26; // how far the curve drops past the card's top edge
const R = 24; // corner radius
const NODE_R = 7;

export function useRailPath(count) {
  const innerRef = useRef(null);
  const cardRefs = useRef([]);
  const [rail, setRail] = useState({
    paths: [],
    gaps: [],
    nodes: [],
    height: 0,
    nodeR: NODE_R,
  });

  const setCardRef = useCallback(
    (i) => (node) => {
      cardRefs.current[i] = node;
    },
    [],
  );

  const measure = useCallback(() => {
    const inner = innerRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!inner || cards.length < 2) {
      setRail({ paths: [], gaps: [], nodes: [], height: 0, nodeR: NODE_R });
      return;
    }

    const base = inner.getBoundingClientRect();
    const geo = cards.map((card) => {
      const b = card.getBoundingClientRect();
      return {
        left: b.left - base.left,
        right: b.right - base.left,
        top: b.top - base.top,
        accent: getComputedStyle(card).getPropertyValue("--accent").trim(),
      };
    });

    // legs stop at the card's top edge; the dip drops a little past it
    const legY = Math.max(geo[0].top, RAIL_Y + R * 2);
    const dipY = legY + DIP_BELOW;

    /* Split at the card edges rather than the gap midpoints. Each card's own
       run is a flat colour; each linking dip is a separate path stroked with a
       gradient, so the two accents blend through the curve instead of meeting
       at a hard seam. Both meet at (edge, RAIL_Y + R), where the gradient's
       end stop equals the adjoining flat colour — so the join is invisible. */
    const paths = geo.map((g, i) => {
      const d = [];

      if (i === 0) d.push(`M ${g.left} ${legY}`, `L ${g.left} ${RAIL_Y + R}`);
      else d.push(`M ${g.left} ${RAIL_Y + R}`);

      d.push(
        `Q ${g.left} ${RAIL_Y} ${g.left + R} ${RAIL_Y}`,
        `L ${g.right - R} ${RAIL_Y}`,
        `Q ${g.right} ${RAIL_Y} ${g.right} ${RAIL_Y + R}`,
      );

      if (i === geo.length - 1) d.push(`L ${g.right} ${legY}`);

      return { d: d.join(" "), stroke: g.accent };
    });

    const gaps = geo.slice(0, -1).map((g, i) => {
      const next = geo[i + 1];
      const d = [
        `M ${g.right} ${RAIL_Y + R}`,
        `L ${g.right} ${dipY - R}`,
        `Q ${g.right} ${dipY} ${g.right + R} ${dipY}`,
        `L ${next.left - R} ${dipY}`,
        `Q ${next.left} ${dipY} ${next.left} ${dipY - R}`,
        `L ${next.left} ${RAIL_Y + R}`,
      ].join(" ");

      return {
        d,
        id: `rail-blend-${i}`,
        x1: g.right,
        x2: next.left,
        from: g.accent,
        to: next.accent,
      };
    });

    const nodes = geo.map((g) => ({
      cx: (g.left + g.right) / 2,
      cy: RAIL_Y,
      stroke: g.accent,
    }));

    setRail({ paths, gaps, nodes, height: dipY + 2, nodeR: NODE_R });
  }, []);

  useLayoutEffect(() => {
    measure();

    const inner = innerRef.current;
    if (!inner) return undefined;

    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    cardRefs.current.filter(Boolean).forEach((c) => ro.observe(c));

    // web fonts change card height, which moves the rail
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    return () => ro.disconnect();
  }, [measure, count]);

  return { innerRef, setCardRef, rail };
}
