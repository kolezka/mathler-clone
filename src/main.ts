// Load root CSS
import "./main.css";

// Load Web Components
import "./components";

import { init } from "./game";

window.addEventListener("load", () => {
  init();
});
