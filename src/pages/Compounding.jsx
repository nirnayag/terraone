import StatementPage from "../components/StatementPage";

/* Placeholder copy — no compounding document was supplied. Written from the
   blending behaviour described in Technologies.docx. Replace with the
   client's own text before launch. */
export default function Compounding() {
  return (
    <StatementPage
      eyebrow="Compounding"
      title="Blends built for the job in front of them"
      lede="No single biopolymer is right for every application. Compounding is where the six technologies stop being separate materials and start being one specification."
      intro="A finished part rarely comes from a single resin. Cost, flexibility, heat resistance and degradation rate pull against each other, and the way to satisfy all four is usually a blend. Our compounding work tunes those trade-offs deliberately rather than accepting whatever a base polymer happens to offer."
      blocks={[
        {
          title: "Why blend at all",
          body: "PLA is rigid and brittle; PBAT brings the stretch and tear resistance it lacks. TPS is the cheapest bio-based polymer available but absorbs moisture from the air, so it is paired with a moisture-resistant partner. PBS runs on existing polypropylene and polyethylene equipment, which makes it a useful carrier. Each blend exists to cancel a specific weakness.",
        },
        {
          title: "Where PHA sits in a blend",
          body: "PHA is the component that makes genuine soil and marine biodegradation possible rather than industrial-composting-only. Its mechanical range is wide — rigid and brittle through to soft and elastic, set by strain and fermentation conditions — so it can be formulated toward a target rather than corrected after the fact.",
        },
        {
          title: "What we need from you",
          body: "The application, the process it has to survive, the volume, and the end-of-life claim you intend to make. That last one matters most: a claim of home compostability, soil biodegradation or marine biodegradation each points at a different formulation, and they are not interchangeable.",
        },
        {
          title: "What you get back",
          body: "A recommended grade or blend, the processing window it needs, and an honest read on where it will underperform the conventional material you are replacing. If PHA is the wrong answer for your application, we will say so.",
        },
      ]}
      cta={{
        body: "Bring us a specification and we will tell you what it needs.",
        actions: [
          { label: "Start a material enquiry", to: "/contact" },
          { label: "See the technologies", to: "/technology", kind: "line" },
        ],
      }}
    />
  );
}
