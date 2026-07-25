import { useCallback, useEffect, useRef, useState } from "react";

/* Runs an async loader and tracks status. Late responses from a superseded
   request are discarded, so switching category or page quickly can't leave
   stale results on screen. */
export function useResource(loader, deps = []) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });
  const run = useRef(0);

  // The caller passes a fresh closure every render, so `loader` can't be a
  // dependency — the caller's `deps` are what decide when to re-run.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(loader, deps);

  useEffect(() => {
    const ticket = ++run.current;
    let alive = true;

    setState((s) => ({ ...s, status: "loading", error: null }));

    load()
      .then((data) => {
        if (alive && ticket === run.current) setState({ status: "ready", data, error: null });
      })
      .catch((error) => {
        if (alive && ticket === run.current) setState({ status: "error", data: null, error });
      });

    return () => {
      alive = false;
    };
  }, [load]);

  return state;
}
