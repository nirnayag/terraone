import { legal } from "../data/legal";
import PageHead from "../components/PageHead";
import "./Legal.css";

const META = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    lede: "How TerraOne collects, uses, stores, shares, transfers and protects personal data, and the rights you hold over it.",
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of use",
    lede: "The terms governing your access to and use of TerraOne's websites, platforms and services.",
  },
};

export default function Legal({ doc }) {
  const meta = META[doc];
  const articles = legal[doc] ?? [];

  return (
    <>
      <PageHead eyebrow={meta.eyebrow} title={meta.title} lede={meta.lede} />

      <section className="band band--tight">
        <div className="shell legal__layout">
          <nav className="legal__toc" aria-label="Contents">
            <p className="legal__toc-key">Contents</p>
            <ol>
              {articles.map((a, i) => (
                <li key={i}>
                  <a href={`#article-${i + 1}`}>{a.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__doc">
            {articles.map((a, i) => (
              <section className="legal__article" id={`article-${i + 1}`} key={i}>
                {a.heading && <h2 className="legal__heading">{a.heading}</h2>}
                {a.items.map((item, j) =>
                  item.kind === "sub" ? (
                    <h3 className="legal__sub" key={j}>
                      {item.num && <span className="legal__num">{item.num}</span>}
                      {item.text}
                    </h3>
                  ) : (
                    <p className="legal__p" key={j}>
                      {item.num && <span className="legal__num">{item.num}</span>}
                      {item.text}
                    </p>
                  ),
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
