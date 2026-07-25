import { useEffect } from "react";
import "./PageHead.css";

/* The masthead of an inner page: eyebrow, title, standfirst.
   Also owns the document title, so tabs and history read correctly. */
export default function PageHead({ eyebrow, title, lede, children, tone = "paper" }) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — TerraOne`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <section className={`pagehead pagehead--${tone}`}>
      <div className="shell pagehead__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display display--lg pagehead__title">{title}</h1>
        {lede && <p className="lede pagehead__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
