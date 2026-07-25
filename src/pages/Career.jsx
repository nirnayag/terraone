import { company } from "../data/content";
import StatementPage from "../components/StatementPage";

/* Placeholder copy — no careers document or open-roles list was supplied.
   Deliberately makes no claims about specific vacancies, headcount or
   benefits. Replace with the client's own text before launch. */
export default function Career() {
  return (
    <StatementPage
      eyebrow="Career"
      title="Work on the material, not the messaging"
      lede="TerraOne is a biotechnology company with a manufacturing problem to solve. The interesting work is in fermentation, polymer science and process engineering."
      intro="We are not currently publishing a live vacancy list on this site. If your work sits in one of the areas below, write to us anyway — we would rather hear from the right person early than advertise late."
      blocks={[
        {
          title: "Microbiology and fermentation",
          body: "Strain selection and fermentation optimisation without genetic modification, which is a harder constraint than it sounds and the reason the company exists.",
        },
        {
          title: "Polymer and materials science",
          body: "Extending the grade range — taking PHA from rigid and brittle through to soft and elastic, and formulating blends with PBS, PBAT, PLA, cellulose and TPS.",
        },
        {
          title: "Process and manufacturing engineering",
          body: "Scaling extraction and downstream processing toward the planned 50,000 TPA, where yield and purity decide whether the economics work.",
        },
        {
          title: "Applications and technical sales",
          body: "Sitting between a customer's specification and what the material can actually do, in ten sectors with very different regulatory environments.",
        },
      ]}
      cta={{
        body: "Send us what you have worked on and what you want to work on next.",
        actions: [
          {
            label: "Email the team",
            href: `mailto:${company.email}?subject=${encodeURIComponent("Career enquiry")}`,
          },
          { label: "Read about us", to: "/who-we-are", kind: "line" },
        ],
      }}
    />
  );
}
