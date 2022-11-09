import "./components";
import "./game";

describe("Mathler", () => {
  // let $mathler;

  beforeEach(() => {
    document.body.innerHTML = `<mathler-game></mathler-game/>`;
  });

  it("test", () => {
    console.log(document.body.innerHTML);
  });
});
