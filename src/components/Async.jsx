import "./Async.css";

/* One place for the three states every API-backed view can be in, so loading
   and failure look deliberate rather than like a broken page. */
export default function Async({ state, children, empty, label = "content", rows = 6 }) {
  if (state.status === "loading") {
    return (
      <div className="async" role="status" aria-live="polite">
        <span className="visually-hidden">Loading {label}…</span>
        <ul className="async__skeleton" aria-hidden="true">
          {Array.from({ length: rows }, (_, i) => (
            <li key={i} style={{ "--i": i }} />
          ))}
        </ul>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="async async--error" role="alert">
        <p className="async__title">That didn't load</p>
        <p className="async__body">
          We couldn't reach the content service, so {label} is unavailable right now. Reload to try
          again, or email{" "}
          <a href="mailto:info@terra1one.com">info@terra1one.com</a> if it keeps happening.
        </p>
        <button className="btn btn--fill" onClick={() => window.location.reload()}>
          Reload the page
        </button>
      </div>
    );
  }

  const isEmpty = Array.isArray(state.data?.items) && state.data.items.length === 0;
  if (isEmpty && empty) return <div className="async async--empty">{empty}</div>;

  return children(state.data);
}
