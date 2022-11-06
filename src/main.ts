// Load root CSS
import "./main.css";

// Load Web Components
import "./components";

import { Mathler } from "./game";

window.addEventListener("load", () => {
  new Mathler();
});
