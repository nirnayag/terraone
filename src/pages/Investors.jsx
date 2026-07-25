import { company } from "../data/content";
import StatementPage from "../components/StatementPage";

/* Placeholder copy — no investor document was supplied. Every claim below is
   drawn from Home Page Content.docx; no funding, revenue or valuation figures
   have been invented. Replace with the client's own text before launch. */
export default function Investors() {
  return (
    <StatementPage
      eyebrow="Investors"
      title="Backing a world first"
      lede="TerraOne is the first company anywhere producing PHA entirely without genetically modified organisms, with 50,000 TPA of capacity planned."
      intro="The bioplastics market is crowded with materials that compost only under industrial conditions. PHA is the one that degrades in open soil and seawater, and non-GMO production opens markets that GMO-derived material cannot enter. That is the position we are building from."
      facts={[
        { figure: "World first", label: "Non-GMO PHA biopolymer manufacturer" },
        { figure: "50,000 TPA", label: "Planned production capacity" },
        { figure: "10 sectors", label: "Addressable today, from packaging to pharmaceutical" },
        { figure: "6", label: "Biopolymer technologies across the portfolio" },
      ]}
      blocks={[
        {
          title: "The thesis",
          body: "Regulation is closing on persistent plastics faster than the alternatives are scaling. Most compostable materials answer only the industrial-composting case, which leaves everything that escapes formal waste systems unsolved. PHA answers the open-environment case, which is where the regulatory pressure actually lands.",
        },
        {
          title: "The differentiator",
          body: "Producing PHA without genetically modified organisms is not a marketing position — it determines which food-contact, cosmetic and agricultural markets a material can be sold into. As the first producer to do it, TerraOne can serve buyers for whom GMO-derived material is disqualifying.",
        },
        {
          title: "Where capital goes",
          body: "Fermentation capacity is the constraint on this business. Capital is directed at scaling production toward the planned 50,000 TPA, broadening the grade range so more applications can be served from the same plant, and qualifying material for the certifications each regulated sector requires.",
        },
        {
          title: "The honest risk",
          body: "Fermentation-based production costs more today than starch- or petroleum-based alternatives. PHA wins where true marine and soil biodegradability is a requirement rather than a preference, and the size of that market is set by how quickly regulation makes it one. We would rather you price that risk than have us talk around it.",
        },
      ]}
      cta={{
        body: "We will walk you through the process, the capacity plan and the numbers.",
        actions: [
          {
            label: "Request the investor brief",
            href: `mailto:${company.email}?subject=${encodeURIComponent("Investor enquiry")}`,
          },
          { label: "Read the technology", to: "/technology", kind: "line" },
        ],
      }}
    />
  );
}
