import { Link } from "react-router-dom";
import { nav } from "../data/content";
import PageHead from "../components/PageHead";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <PageHead
        eyebrow="404"
        title="That page isn't here"
        lede="The link may be out of date, or the page may have moved. Everything below still works."
      />

      <section className="band band--tight">
        <div className="shell">
          <ul className="notfound__links">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <Link className="btn btn--fill notfound__home" to="/">
            Back to the homepage
          </Link>
        </div>
      </section>
    </>
  );
}
