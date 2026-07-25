import { contrast } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./Contrast.css";

export default function Contrast() {
  const scope = useReveal();

  return (
    <section className="band contrast" id="problem" ref={scope}>
      <div className="shell">
        <p className="eyebrow reveal">{contrast.eyebrow}</p>

        <div className="contrast__pair">
          <article className="panel panel--old reveal">
            <p className="panel__kicker">{contrast.left.kicker}</p>
            <h2 className="display display--md panel__heading">{contrast.left.heading}</h2>
            <p className="panel__body">{contrast.left.body}</p>
          </article>

          <article className="panel panel--new reveal" style={{ transitionDelay: "120ms" }}>
            <p className="panel__kicker">{contrast.right.kicker}</p>
            <h2 className="display display--md panel__heading">{contrast.right.heading}</h2>
            <p className="panel__body">{contrast.right.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
