import { useState } from "react";
import { faqs } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./Faq.css";

export default function Faq() {
  const scope = useReveal();
  const [open, setOpen] = useState(0);

  return (
    <section className="band faq" ref={scope}>
      <div className="shell faq__inner">
        <div className="faq__intro reveal">
          <p className="eyebrow">Questions</p>
          <h2 className="display display--lg faq__heading">Everything worth asking first</h2>
          <p className="lede faq__note">
            Still unresolved? Write to{" "}
            <a href="mailto:info@terra1one.com">info@terra1one.com</a> and we will answer properly.
          </p>
        </div>

        <ul className="faq__list reveal">
          {faqs.map((item, i) => {
            const isOpen = i === open;
            return (
              <li className={`qa${isOpen ? " is-open" : ""}`} key={item.q}>
                <h3>
                  <button
                    className="qa__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`qa-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="qa__q">{item.q}</span>
                    <span className="qa__sign" aria-hidden="true" />
                  </button>
                </h3>
                <div className="qa__answer" id={`qa-${i}`} hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
