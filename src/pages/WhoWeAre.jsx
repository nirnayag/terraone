import { overview, contrast, metrics } from "../data/content";
import StatementPage from "../components/StatementPage";

export default function WhoWeAre() {
  return (
    <StatementPage
      eyebrow="Who we are"
      title={overview.heading}
      lede={overview.body}
      intro={overview.note}
      facts={metrics.map((m) => ({
        figure: m.unit ? `${m.figure} ${m.unit}` : m.figure,
        label: m.label,
      }))}
      blocks={[
        { title: contrast.left.heading, body: contrast.left.body },
        { title: contrast.right.heading, body: contrast.right.body },
        {
          title: "Why non-GMO matters",
          body: "TerraOne is the first company in the world to produce PHA entirely without genetically modified organisms. The fermentation runs on naturally occurring strains and renewable feedstocks. For buyers in food contact, cosmetics and regulated agricultural markets, that removes a compliance question before it is asked.",
        },
      ]}
      cta={{
        body: "Want the detail behind the material rather than the summary?",
        actions: [
          { label: "Read the technology", to: "/technology" },
          { label: "See the applications", to: "/application", kind: "line" },
        ],
      }}
    />
  );
}
