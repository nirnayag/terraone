import { company } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import "./Collaborate.css";

/* Serves both the Investors and Contact entries in the nav — the ask is the
   same one either way: tell us what you need and we will route it. */
const routes = [
  {
    id: "investors",
    tag: "Investors",
    title: "Back a first",
    body: "TerraOne is the first company in the world producing PHA without genetically modified organisms, with 50,000 TPA of capacity planned. If you are looking at biomaterials, we will walk you through the process and the numbers.",
    action: { label: "Request the investor brief", href: `mailto:${company.email}?subject=Investor%20enquiry` },
  },
  {
    id: "compounding-enquiry",
    tag: "Compounding",
    title: "Specify a grade",
    body: "Bring us the application, the volume and the performance envelope. We will tell you whether a single grade covers it or whether it needs a blend — and say so plainly if PHA is the wrong material for the job.",
    action: { label: "Start a material enquiry", href: `mailto:${company.email}?subject=Material%20enquiry` },
  },
];

export default function Collaborate() {
  const scope = useReveal();

  return (
    <section className="band band--ink collaborate" id="contact" ref={scope}>
      <div className="shell">
        <div className="head collaborate__head reveal">
          <p className="eyebrow">Collaboration</p>
          <h2 className="display display--lg">Work with us</h2>
        </div>

        <div className="collaborate__routes">
          {routes.map((r, i) => (
            <article
              className="route reveal"
              id={r.id}
              key={r.id}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="route__tag">{r.tag}</p>
              <h3 className="display display--md route__title">{r.title}</h3>
              <p className="route__body">{r.body}</p>
              <a className="btn btn--fill route__action" href={r.action.href}>
                {r.action.label}
              </a>
            </article>
          ))}

          <address className="route route--card reveal" style={{ transitionDelay: "180ms" }}>
            <p className="route__tag">Reach us</p>
            <ul className="route__contact">
              <li>
                <span className="route__key">Office</span>
                <span>{company.address}</span>
              </li>
              <li>
                <span className="route__key">Phone</span>
                <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              </li>
              <li>
                <span className="route__key">Email</span>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </section>
  );
}
