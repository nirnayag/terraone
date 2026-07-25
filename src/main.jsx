import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* Base styles first so component stylesheets, which are imported further down
   the module graph, are free to override the shared primitives. */
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
