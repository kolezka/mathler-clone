// Load root CSS
import "./main.css";

// Load Mathler Game
import { Mathler } from "./game";

window.addEventListener("load", () => {
  new Mathler({
    expectedResult: "8/4+11",
    expectedResultValue: 13,
  });
});
