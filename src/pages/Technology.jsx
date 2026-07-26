import React, { useState } from "react";
import { Link } from "react-router-dom";
import { process } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import TechHero from "../components/TechHero";
import Technologies from "../components/Technologies";
import "./Technology.css";

export default function Technology() {
  const scope = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectNode = (idx) => {
    setActiveIndex(idx);
    // Smooth scroll down to the portfolio detail section if clicked
    const element = document.getElementById("technology");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Premium Hero Banner matching phototune.ai_1785081274.png */}
      <TechHero activeIndex={activeIndex} onSelectNode={handleSelectNode} />

      {/* Biopolymer Portfolio Section */}
      <Technologies standalone selectedIndex={activeIndex} onSelect={setActiveIndex} />

      {/* Process Section */}
      <section className="band band--tight techprocess" ref={scope}>
        <div className="shell">
          <div className="head reveal">
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 className="display display--lg">{process.heading}</h2>
            <p className="lede">{process.body}</p>
          </div>

          <ol className="techsteps">
            {process.steps.map((s, i) => (
              <li className="techstep reveal" key={s.title} style={{ transitionDelay: `${i * 70}ms` }}>
                <p className="techstep__num">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="techstep__title">{s.title}</h3>
                  <p className="techstep__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="techcta reveal">
            <p className="techcta__body">
              Not sure which technology fits? Describe the application and we will tell you
              straight — including when PHA is the wrong answer.
            </p>
            <Link className="btn btn--fill" to="/contact">
              Talk to a materials engineer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
