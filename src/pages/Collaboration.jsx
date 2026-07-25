import { company } from "../data/content";
import StatementPage from "../components/StatementPage";

/* Placeholder copy — no collaboration document was supplied. Replace with the
   client's own text before launch. */
export default function Collaboration() {
  return (
    <StatementPage
      eyebrow="Collaboration"
      title="Partners, not just customers"
      lede="Replacing a material is rarely a drop-in. The work that succeeds is usually joint work, so we set it up that way from the start."
      intro="Whether you are reformulating a product line, running a trial, or researching where PHA can go next, the useful conversations start with a specific problem rather than a general interest in sustainability."
      blocks={[
        {
          title: "Brand and manufacturer partnerships",
          body: "You have a product, a process and a deadline. We work backwards from the performance envelope and the end-of-life claim you need to make, and tell you what is achievable now versus what needs development.",
        },
        {
          title: "Research collaboration",
          body: "PHA is among the more actively researched biopolymers in regenerative medicine, controlled release and marine-safe materials. We work with academic and institutional groups where the question is genuinely open.",
        },
        {
          title: "Distribution and supply",
          body: "For partners taking TerraOne material into regional markets, the constraints that matter are certification, volume commitment and lead time. Bring those and we can have a concrete conversation.",
        },
        {
          title: "Pilots and trials",
          body: "Most partnerships start with a trial quantity against a defined success criterion. Agreeing what would count as a failure, before the trial starts, saves everyone a quarter.",
        },
      ]}
      cta={{
        body: "Tell us the problem you are trying to solve and who needs to be convinced.",
        actions: [
          { label: "Start a conversation", to: "/contact" },
          {
            label: company.email,
            href: `mailto:${company.email}`,
            kind: "line",
          },
        ],
      }}
    />
  );
}
